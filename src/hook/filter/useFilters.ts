import { useState } from "react";
import FilterInterface from "@filter/ui/FilterInterface";

type WithId = { id: string | number, title: string };

export function useFilters<T extends WithId>(definitions: FilterInterface[]) {
  const [values, setValues] = useState<Record<string, T[] | boolean>>(() =>
    Object.fromEntries(definitions.map((def) => [def.getKey(), def.getValue()]))
  );
  const [options, setOptions] = useState<Record<string, T[]>>({});
  const [loadingOptions, setLoadingOptions] = useState<Record<string, boolean>>({});

  const openDrawer = async (key: string) => {
    const filter = definitions.find((d) => d.getKey() === key);
    if (!(filter?.getType() == "multi-select")) return;

    setLoadingOptions((prev) => ({ ...prev, [key]: true }));
    await filter.loadOptions();

    setOptions((prev) => ({ ...prev, [key]: filter.getOptions() }));
    setLoadingOptions((prev) => ({ ...prev, [key]: false }));
  };

  const toggleOption = (key: string, value: T) => {
    setValues((prev) => {
      const arr = prev[key] as T[];
      const exists = arr.some((item) => item.id === value.id);
      const newArr = exists ? arr.filter((item) => !(item.id === value.id)) : [...arr, value];
      return { ...prev, [key]: newArr };
    });
  };

  const toggleBoolean = (key: string) => {
    setValues((prev) => {
      const current = prev[key] as boolean;
      return { ...prev, [key]: !current };
    });
  };

  const buildFilterString = (entity: string) => {
    const parts: string[] = [];
    entity = entity.replace("-", "_");
    for (const def of definitions) {
      let titles: any = [];
      if (def.getType() == "multi-select") {
        titles = (values[def.getKey()] as T[]).map((item) => item.id);
      }

      if (def.getType() === "multi-select" && titles.length) {
        parts.push(`${entity}_${def.getKey()}_0{in}${titles.join(",")}`);
      }
      if (def.getType() === "boolean" && values[def.getKey()]) {
        parts.push(`${entity}_${def.getKey()}_0={eq}1`);
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
    definitions,
  };
}
