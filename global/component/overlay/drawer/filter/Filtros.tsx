"use client";

import { BottomDrawer } from "@global/component/overlay/drawer/Bottom";
import { useEffect, useState } from "react";
import ParentFilterItem from "./ParentFilterItem";
import SearchBar from "@global/component/atomic/SearchBar";
import Loading2 from "@global/component/overlay/popup/dialog/Loading2";
import useSearch from "@global/hook/useSearch";
import { getFilterComponent } from "@/component/overlay/drawer/filter/CustomFilterComponents";

interface Props {
  open: boolean;
  title?: string;
  options: any;
  selected: any;
  loading: boolean;
  optionLabel?: string;
  optionId?: string;
  parentOptionLabel?: string;
  parentOptionId?: string;
  filterKey?: string;
  parentKey?: string;
  onClose: () => void;
  onToggleParent: (filterKey: any, parentKey: any, parentId: any, childrenIds: any[]) => any;
  onToggleChild: (filterKey: any, childId: any, parentKey?: any, parentId?: any, allChildrenIds?: any[]) => any;
  onClearFilter?: (filterKey: any) => void;
  hasClearFilter?: boolean;
  hasSearch?: boolean;
  selectionMode?: "multi" | "single";
  customLabelFields?: string[];
  customOptionComponent?: string;
}

export default function Filtros({
  open,
  title,
  options,
  selected,
  onClose,
  onClearFilter,
  hasClearFilter,
  hasSearch,
  selectionMode = "multi",
  customLabelFields,
  customOptionComponent,
  ...props
}: Props) {
  const [parentOpen, setParentOpen] = useState("");

  const {
    filteredData: filteredOptions,
    searchTerm,
    setSearchTerm,
  } = useSearch({
    options: options,
    keyParams: [props.optionLabel || "", props.parentOptionLabel || "", ...(customLabelFields || [])],
  });

  useEffect(() => {
    setSearchTerm("");
  }, [open])

  // Obtém o componente correto para renderizar
  const FilterItemComponent = getFilterComponent(customOptionComponent);

  return (
    <BottomDrawer customClass="semi-full" open={open} title={title} onClose={onClose}>
      {onClearFilter && hasClearFilter && (
        <button className="clear" onClick={() => onClearFilter(props.filterKey)}>
          Limpar filtro
        </button>
      )}
      {hasSearch && (
        <div className="search-wrapper">
          <SearchBar value={searchTerm || ""} onChange={(e) => setSearchTerm(e)} />
        </div>
      )}
      {props.loading ? (
        <Loading2 loading />
      ) : (
        <div className="filter-items">
          {filteredOptions.map((opt: any, idx: number) => {
            if (opt["isParent"]) {
              return (
                <ParentFilterItem
                  key={idx}
                  opt={opt}
                  selected={selected}
                  parentOpen={parentOpen}
                  setParentOpen={setParentOpen}
                  {...props}
                />
              );
            } else {
              return (
                <FilterItemComponent
                  key={idx}
                  opt={opt}
                  selected={selected}
                  selectionMode={selectionMode}
                  {...props}
                />
              );
            }
          })}
        </div>
      )}
    </BottomDrawer>
  );
}
