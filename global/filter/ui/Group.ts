import AbstractFilter from "./AbstractFilter";
import FilterInterface, {
  ConnectionOperator,
  DEFAULT_VALUES,
  FilterType,
} from "./FilterInterface";
import { FilterFragment } from "../StringAssembler";

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
      FilterType.GROUP,
      DEFAULT_VALUES.BOOLEAN_CONDITIONAL_PERATOR,
      connectionOperator || DEFAULT_VALUES.CONNECTION_OPERATOR,
      DEFAULT_VALUES.DENIAL_OPERATOR
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
