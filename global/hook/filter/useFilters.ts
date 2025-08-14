import { useEffect, useState } from "react";
import FilterInterface from "@global/filter/ui/FilterInterface";
import FilterStringAssembler, { FilterFragment } from "@global/filter/StringAssembler";

// Helper to flatten definitions, extracting children from groups
function flattenDefinitions(definitions: FilterInterface[]): FilterInterface[] {
  return definitions.flatMap((def) =>
    def.isGroup() ? flattenDefinitions(def.getChildren()) : [def]
  );
}

export function useFilters(definitions: FilterInterface[]) {
  // Flatten the definitions to get all leaf filters (no groups)
  const flatDefinitions = flattenDefinitions(definitions);

  const [values, setValues] = useState<any>(() =>
    Object.fromEntries(flatDefinitions.map((def) => [def.getKey(), def.getInitialValue()]))
  );
  const [options, setOptions] = useState<Record<string, any[]>>({});
  const [loadingOptions, setLoadingOptions] = useState<Record<string, boolean>>({});

  useEffect(() => {
    flatDefinitions.map((def) => {
      try {
        setValues((prev: any) => ({ ...prev, [def.getKey()]: def.getInitialValue() }));
        if (def.getParentKey()) {
          setValues((prev: any) => ({ ...prev, [def.getParentKey()]: def.getInitialValue() }));
        }
      } catch (error) { }
    });
  }, []);

  const openDrawer = async (key: string) => {
    const filter = flatDefinitions.find((def) => def.getKey() === key);
    if (!(filter?.getType() == "select")) return;

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
    // Get the filter definition to check its selection mode
    const filterDefinition = flatDefinitions.find((def) => def.getKey() === filterKey);
    const selectionMode = filterDefinition?.getSelectionMode();

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
          if (selectionMode === "single") {
            // Single select: replace the current selection
            newValues[filterKey] = [childId];
          } else {
            // Multi select: toggle the selection
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
        }

        return newValues;
      });
    } else {
      setValues((prev: any) => {
        const newValues = { ...prev };
        const currentChildrenIds = prev[filterKey] || [];

        if (selectionMode === "single") {
          // Single select: replace the current selection
          newValues[filterKey] = [childId];
        } else {
          // Multi select: toggle the selection
          if (currentChildrenIds.includes(childId)) {
            newValues[filterKey] = currentChildrenIds.filter((id: any) => id !== childId);
          } else {
            newValues[filterKey] = [...currentChildrenIds, childId];
          }
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
      const definition = flatDefinitions.find((def) => def.getKey() === key);

      if (definition) {
        // Limpa o valor principal
        newValues[definition.getKey()] = definition.getInitialValue();

        // Se houver parentKey, limpa também
        if (definition.getParentKey()) {
          newValues[definition.getParentKey()] = definition.getInitialValue();
        }
      }

      return newValues;
    });
  };

  const buildFilterString = (entity: string) => {
    entity = entity.replace("-", "_");
    const fragments = definitions
      .flatMap((def) => def.getFilterFragment(values))
      .filter(Boolean) as FilterFragment[];

    return FilterStringAssembler.assemble(fragments);
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
    definitions: flatDefinitions,
  };
}
