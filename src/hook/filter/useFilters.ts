import { useState } from "react";
import FilterInterface from "@filter/ui/FilterInterface";

type FilterValue = string[] | boolean;

export function useFilters(definitions: FilterInterface[]) {
  const [values, setValues] = useState<Record<string, FilterValue>>(
    () =>
      Object.fromEntries(
        definitions.map(def =>
          [def.getKey(), def.getValue()]
        )
      )
  );
  const [options, setOptions] = useState<Record<string, Object[]>>({});
  const [loadingOptions, setLoadingOptions] = useState<Record<string, boolean>>({});

  const openDrawer = async (key: string) => {
    const filter = definitions.find(d => d.getKey() === key);
    if (!(filter?.getType() == "multi-select"))
        return;

    setLoadingOptions(prev => ({ ...prev, [key]: true }));
    await filter.loadOptions();
    setOptions(prev => ({ ...prev, [key]: filter.getOptions() }));
    setLoadingOptions(prev => ({ ...prev, [key]: false }));
  };

  const toggleOption = (key: string, value: string) => {
    setValues(prev => {
      const arr = prev[key] as string[];
      const newArr = arr.includes(value)
        ? arr.filter(v => v !== value)
        : [...arr, value];
      return { ...prev, [key]: newArr };
    });
  };

  const toggleBoolean = (key: string) => {
    setValues(prev => ({ ...prev, [key]: !(prev[key] as boolean) }));
  };

  const buildFilterString = () => {
    const parts: string[] = [];
    for (const def of definitions) {
      let titles = [];
      if (def.getType() == "multi-select") {
        titles = (values[def.getKey()] as string[]).map((item: any) => item.title);
      }

      if (def.getType() === "multi-select" && titles.length) {
        parts.push(`${def.getKey()}{in}${(titles).join(",")}`);
      }
      if (def.getType() === "boolean" && values) {
        parts.push(`${def.getKey()}=1`);
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
    toggleOption,
    toggleBoolean,
    buildFilterString,
    definitions
  };
}
