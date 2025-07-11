import { useEffect, useState } from "react";
import FilterInterface, { ConnectionOperator } from "@filter/ui/FilterInterface";
import { format } from "path";

export function useFilters(definitions: FilterInterface[]) {
  const [values, setValues] = useState<any>(() =>
    Object.fromEntries(definitions.map((def) => [def.getQueryField(), def.getValue()]))
  );
  const [options, setOptions] = useState<Record<string, any[]>>({});
  const [loadingOptions, setLoadingOptions] = useState<Record<string, boolean>>({});

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

    setLoadingOptions((prev) => ({ ...prev, [key]: true }));
    await filter.loadOptions();

    setOptions((prev) => ({ ...prev, [key]: filter.getOptions() }));
    setLoadingOptions((prev) => ({ ...prev, [key]: false }));
  };

  const toggleParent = (
    filterKey: any,
    parentKey: any,
    parentId: string,
    allChildrenIds: string[]
  ) => {
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

  const buildFilterString = (entity: string) => {
    let parts: { value: string; connector: ConnectionOperator }[] = [];
    entity = entity.replace("-", "_");

    definitions.forEach((def, index) => {
      const type = def.getType();
      const queryFieldEntity = def.getQueryFieldEntity() ? `${def.getQueryFieldEntity()}_` : "";
      const queryField = def.getQueryField();
      const conditionalOperator = def.getConditionalOperator();
      const connectionOperator = def.getConnectionOperator();
      const denialOperator = def.getDenialOperator();

      let keyFilteredValues: any = [];
      let parentKeyFilteredValues: any = [];

      //verificar o tipo de conexao (and/or)
      //verificar o tipo de condicional (eq, in, etc)
      //verificar se é "not" !()

      if (type === "multi-select") {
        const parentKey = def.getParentKey();
        const parentKeyEntity = def.getParentKeyEntity() ? `${def.getParentKeyEntity()}_` : "";
        const parentConnectionOperator = def.getParentConnectionOperator();
        const parentConditionalOperator = def.getParentConditionalOperator();
        const parentDenialOperator = def.getParentDenialOperator();

        // coleta os valores selecionados
        if (values[queryField]?.length > 0) {
          keyFilteredValues = values[queryField].map((item: any) => item);
        }
        if (parentKey && values[parentKey]?.length > 0) {
          parentKeyFilteredValues = values[parentKey].map((item: any) => item);
        }

        // adiciona os filtros multiple do child na query
        if (keyFilteredValues.length) {
          let currentFilter = `${queryFieldEntity}${queryField}_0{${conditionalOperator}}${keyFilteredValues.join(
            ","
          )}`;
          currentFilter = denialOperator ? `!(${currentFilter})` : currentFilter;

          parts.push({ value: currentFilter, connector: connectionOperator });
        }

        // adiciona os filtros multiple do parent na query
        if (parentKeyFilteredValues.length) {
          let currentFilter = `${parentKeyEntity}${parentKey}_0{${parentConditionalOperator}}${parentKeyFilteredValues.join(
            ","
          )}`;
          currentFilter = parentDenialOperator ? `!(${currentFilter})` : currentFilter;

          parts.push({ value: currentFilter, connector: parentConnectionOperator });
        }
      } else if (type === "boolean" && values[queryField]) {
        const activeValue = def.getActiveValue();
        if (activeValue == values[queryField]) {
          let currentFilter = `${queryFieldEntity}${queryField}_0{${conditionalOperator}}${activeValue}`;
          currentFilter = denialOperator ? `!(${currentFilter})` : currentFilter;

          parts.push({ value: currentFilter, connector: connectionOperator });
        }
      }
    });

    const format = parts.map((item, index) => {
      if (index === 0) {
        return `${item.value}{${item.connector}}`;
      } else {
        return `{${item.connector}}${item.value}`;
      }
    });
    // console.log(JSON.stringify(parts, null, 2));

    // console.log(format.join("").replace("{and}{or}", "{or}").replace("{ir}{and}", "{or}"));

    return format.join("").replace("{and}{or}", "{or}").replace("{ir}{and}", "{or}")

    // return JSON.stringify(parts, null, 2);
    // return format.join("").replace(/\{[^{}]*\}/, '');
    // return parts.replace(/\{[^{}]*\}$/, "");
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
  };
}
