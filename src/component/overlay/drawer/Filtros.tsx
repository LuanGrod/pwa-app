"use client";

import { BottomDrawer } from "@global/overlay/drawer/Bottom";
import { useState } from "react";
import SimpleFilterItem from "./SimpleFilterItem";
import ParentFilterItem from "./ParentFilterItem";

interface Props {
  open: boolean;
  title?: string;
  options: any;
  selected: any;
  onClose: () => void;
  onToggleParent: (filterKey: any, parentKey: any, parentId: any, childrenIds: any[]) => any;
  onToggleChild: (filterKey: any, childId: any, parentKey?: any, parentId?: any, allChildrenIds?: any[]) => any;
  loading: boolean;
  optionLabel?: string;
  optionId?: string;
  parentOptionLabel?: string;
  parentOptionId?: string;
  filterKey?: string;
  parentKey?: string;
}

export default function Filtros({ open, title, options, selected, onClose, ...props }: Props) {
  const [parentOpen, setParentOpen] = useState("");

  return (
    <BottomDrawer open={open} title={title} onClose={onClose}>
      {options.map((opt: any, idx: number) => {
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
    </BottomDrawer>
  );
}
