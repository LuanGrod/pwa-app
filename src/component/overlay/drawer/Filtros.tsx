"use client";

import { BottomDrawer } from "@global/overlay/drawer/Bottom";
import { useEffect, useState } from "react";
import SimpleFilterItem from "./SimpleFilterItem";
import ParentFilterItem from "./ParentFilterItem";
import SearchBar from "@global/atomic/SearchBar";
import Loading2 from "@global/overlay/popup/dialog/Loading2";
import useSearch from "@/hook/useSearch";

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
  hasSearch?: boolean;
}

export default function Filtros({
  open,
  title,
  options,
  selected,
  onClose,
  onClearFilter,
  hasSearch,
  ...props
}: Props) {
  const [parentOpen, setParentOpen] = useState("");

  const {
    filteredData: filteredOptions,
    searchTerm,
    setSearchTerm,
  } = useSearch({
    options: options,
    keyParams: [props.optionLabel ? props.optionLabel : "", props.parentOptionLabel ? props.parentOptionLabel : ""],
  });

  useEffect(() => {
    setSearchTerm("");
  }, [open])

  return (
    <BottomDrawer customClass="semi-full" open={open} title={title} onClose={onClose}>
      {onClearFilter && (
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
              return <SimpleFilterItem key={idx} opt={opt} selected={selected} {...props} />;
            }
          })}
        </div>
      )}
    </BottomDrawer>
  );
}
