import { FilterInterface } from "@global/filter/FilterInterface";
import { useCallback } from "react";

export function useFilters(filters: FilterInterface[]) {
  const applyFilters = useCallback(
    (val: string) => {
      if (filters.length > 0) {
        for (const filter of filters) {
          val = filter.apply(val);
        }
      }
      return val;
    },
    [filters]
  );

  return { applyFilters };
}
