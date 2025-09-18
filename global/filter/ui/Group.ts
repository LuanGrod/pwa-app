import AbstractFilter from "./AbstractFilter";
import FilterInterface from "./FilterInterface";
import { FilterFragment } from "../StringAssembler";
import { ConnectionOperator } from "@global/type/filter/ConnectionOperator";
import { DEFAULT_FILTER_VALUES } from "@global/constants/filter/ui/Values";
import { ConditionalOperator } from "@global/type/filter/ConditionalOpeator";

type GroupProps = {
  children: FilterInterface[];
  connectionOperator?: ConnectionOperator;
};

export default class Group extends AbstractFilter {
  private children: FilterInterface[];

  constructor({ children, connectionOperator }: GroupProps) {
    super(
      "",
      "",
      "group",
      DEFAULT_FILTER_VALUES.BOOLEAN_CONDITIONAL_OPERATOR as ConditionalOperator,
      connectionOperator || (DEFAULT_FILTER_VALUES.CONNECTION_OPERATOR as ConnectionOperator),
      DEFAULT_FILTER_VALUES.DENIAL_OPERATOR as boolean
    );
    this.children = children;
  }

  getFilterFragment(values: Record<string, any>): FilterFragment[] {
    const childFragments = this.children
      .flatMap((child) => child.getFilterFragment(values))
      .filter(Boolean);

    if (childFragments.length === 0) return [];
    if (childFragments.length === 1) return childFragments;

    // Determine group connector (OR takes precedence)
    const hasOrConnector = childFragments.some((f) => f.connector === "or");
    const groupConnector = hasOrConnector ? "or" : "and";

    // Group the fragments with parentheses
    const groupedValue = `(${childFragments.map((f) => f.value).join(`{${groupConnector}}`)})`;

    return [{ value: groupedValue, connector: this.connectionOperator }];
  }

  isGroup(): boolean {
    return true;
  }

  getChildren(): FilterInterface[] {
    return this.children;
  }
}
