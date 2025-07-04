import { useEffect, useState } from "react";
import FilterInterface from "@filter/ui/FilterInterface";

export function useFilters(definitions: FilterInterface[]) {
  const [values, setValues] = useState<any>(() =>
    Object.fromEntries(definitions.map((def) => [def.getQueryField(), def.getValue()]))
  );
  const [options, setOptions] = useState<Record<string, any[]>>({});
  const [loadingOptions, setLoadingOptions] = useState<Record<string, boolean>>({});
  // const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    definitions.map((def) => {
      try {
        setValues((prev: any) => ({ ...prev, [def.getQueryField()]: def.getValue() }));
        if (def.getParentKey()) {
          setValues((prev: any) => ({ ...prev, [def.getParentKey()]: def.getValue() }));
        }
      } catch (error) {}
    });
  }, []);

  const openDrawer = async (key: string) => {
    const filter = definitions.find((def) => def.getQueryField() === key);
    if (!(filter?.getType() == "multi-select")) return;

    // setSearchTerm("");

    setLoadingOptions((prev) => ({ ...prev, [key]: true }));
    await filter.loadOptions();

    setOptions((prev) => ({ ...prev, [key]: filter.getOptions() }));
    setLoadingOptions((prev) => ({ ...prev, [key]: false }));
  };

  const toggleParent = (filterKey: any, parentKey: any, parentId: string, allChildrenIds: string[]) => {
    setValues((prev: any) => {
      const newValues = { ...prev };
      const parentSelected = prev[parentKey].includes(parentId);

      if (parentSelected) {
        // Desseleção do pai: remover pai + remover TODOS os filhos associados
        newValues[parentKey] = prev[parentKey].filter((id: any) => id !== parentId);
        newValues[filterKey] = prev[filterKey].filter((id: any) => !allChildrenIds.includes(id));
      } else {
        // Seleção do pai: adicionar pai + remover TODOS os filhos
        newValues[parentKey] = [...prev[parentKey], parentId];
        newValues[filterKey] = prev[filterKey].filter((id: any) => !allChildrenIds.includes(id));
      }

      return newValues;
    });
  };

  const toggleChild = (
    filterKey: any,
    childId: string,
    parentKey?: any,
    parentId?: string,
    allChildrenIds?: string[]
  ) => {
    if (parentKey && parentId && allChildrenIds) {
      setValues((prev: any) => {
        const newValues = { ...prev };
        const parentSelected = prev[parentKey].includes(parentId);
        const currentChildrenIds = prev[filterKey] || [];

        // 1. Desseleção de filho com pai selecionado
        if (parentSelected) {
          // Remover pai
          newValues[parentKey] = prev[parentKey].filter((id: any) => id !== parentId);

          // Adicionar todos os filhos EXCETO o atual + filhos manualmente desselecionados
          newValues[filterKey] = [
            ...allChildrenIds.filter((id) => id !== childId),
            ...currentChildrenIds.filter((id: any) => !allChildrenIds.includes(id)),
          ];
        }
        // 2. Seleção normal de filho
        else {
          // Alternar filho
          const newChildArray = currentChildrenIds.includes(childId)
            ? currentChildrenIds.filter((id: any) => id !== childId)
            : [...currentChildrenIds, childId];

          newValues[filterKey] = newChildArray;

          // 3. Verificar conversão para seleção de pai
          const allChildrenSelected = allChildrenIds.every((id) => newChildArray.includes(id));

          if (allChildrenSelected) {
            // Converter para seleção de pai
            newValues[parentKey] = [...prev[parentKey], parentId];
            newValues[filterKey] = newChildArray.filter((id: any) => !allChildrenIds.includes(id));
          }
        }

        return newValues;
      });
    } else {
      setValues((prev: any) => {
        const newValues = { ...prev };
        const currentChildrenIds = prev[filterKey] || [];

        // Alternar filho
        if (currentChildrenIds.includes(childId)) {
          newValues[filterKey] = currentChildrenIds.filter((id: any) => id !== childId);
        } else {
          newValues[filterKey] = [...currentChildrenIds, childId];
        }

        return newValues;
      });
    }
  };

  const toggleBoolean = (key: string, value: any) => {
    setValues((prev: any) => {
      return { ...prev, [key]: value };
    });
  };

  const clearFilter = (key: string) => {
    setValues((prev: any) => {
      const newValues = { ...prev };
      const definition = definitions.find((def) => def.getKey() === key);

      if (definition) {
        // Limpa o valor principal
        newValues[definition.getQueryField()] = definition.getValue();

        // Se houver parentKey, limpa também
        if (definition.getParentKey()) {
          newValues[definition.getParentKey()] = definition.getValue();
        }
      }

      return newValues;
    });
  };

  // const filterOptionsBySearch = (options: any[], labelParam: string, parentLabelParam?: string) => {
  //   if (!searchTerm.trim()) return options;

  //   const searchLower = searchTerm.toLowerCase();

  //   return options.filter((option: any) => {
  //     // Para itens pai, busca no nome do pai e dos filhos
  //     if (option.isParent && option.children) {
  //       // Busca no nome do pai
  //       const parentMatch = parentLabelParam && option[parentLabelParam]?.toLowerCase().includes(searchLower);

  //       // Busca nos filhos
  //       const childrenMatch = option.children.some((child: any) =>
  //         child[labelParam]?.toLowerCase().includes(searchLower)
  //       );

  //       return parentMatch || childrenMatch;
  //     }

  //     // Para itens simples, busca no label do item
  //     return option[labelParam]?.toLowerCase().includes(searchLower);
  //   });
  // };

  const buildFilterString = (entity: string) => {
    const parts: string[] = [];
    entity = entity.replace("-", "_");
    for (const def of definitions) {
      let keyFilteredValues: any = [];
      let parentKeyFilteredValues: any = [];
      if (def.getType() == "multi-select") {
        if (def.getParentKey()) {
          parentKeyFilteredValues = values[def.getParentKey()].map((item: any) => item);
        }
        keyFilteredValues = values[def.getQueryField()].map((item: any) => item);
      }

      if (def.getType() === "multi-select" && keyFilteredValues.length) {
        const queryFieldEntity = def.getQueryFieldEntity() || entity;
        parts.push(`${queryFieldEntity}_${def.getQueryField()}_0{in}${keyFilteredValues.join(",")}`);
      }
      if (def.getType() === "multi-select" && parentKeyFilteredValues.length) {
        const parentKeyEntity = def.getParentKeyEntity() || entity;
        parts.push(`${parentKeyEntity}_${def.getParentKey()}_0{in}${parentKeyFilteredValues.join(",")}`);
      }

      if (def.getType() === "boolean" && values[def.getQueryField()]) {
        if (def.getActiveValue() == values[def.getQueryField()]) {
          parts.push(`${entity}_${def.getQueryField()}_0={eq}${def.getActiveValue()}`);
        }
      }
    }
    return parts.join("{and}");
  };

  return {
    values,
    setValues,
    options,
    loadingOptions,
    openDrawer,
    toggleParent,
    toggleChild,
    toggleBoolean,
    clearFilter,
    buildFilterString,
    definitions,
    // searchTerm,
    // setSearchTerm,
    // filterOptionsBySearch,
  };
}
