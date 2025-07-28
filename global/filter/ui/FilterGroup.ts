import AbstractFilter from "./AbstractFilter";
import FilterInterface, { ConnectionOperator, ConditionalOperator, SelectionMode } from "./FilterInterface";
import { FilterFragment } from "./FilterStringAssembler";

type FilterGroupProps = {
  children: FilterInterface[];
  connectionOperator?: ConnectionOperator;
};

export default class FilterGroup extends AbstractFilter {
  private children: FilterInterface[];

  constructor({
    children,
    connectionOperator = "and",
  }: FilterGroupProps) {
    super("", "", "group", "", "", "eq", connectionOperator);
    this.children = children;
  }

  /**
   * Builds the filter fragments for this group.
   * Groups children fragments with parentheses and determines connector precedence.
   */
  getFilterFragment(
    values: Record<string, any>,
  ): FilterFragment[] {
    const childFragments = this.children
      .flatMap((child) => child.getFilterFragment(values))
      .filter(Boolean);

    if (childFragments.length === 0) return [];
    if (childFragments.length === 1) return childFragments;

    // Determine group connector (OR takes precedence)
    const hasOrConnector = childFragments.some((f) => f.connector === "or");
    const groupConnector = hasOrConnector ? "or" : "and";

    // Group the fragments with parentheses
    const groupedValue = `(${childFragments
      .map((f) => f.value)
      .join(`{${groupConnector}}`)})`;

    return [{ value: groupedValue, connector: this.connectionOperator }];
  }

  /**
   * Returns true since this is a group filter.
   */
  isGroup(): boolean {
    return true;
  }

  /**
   * Returns the children filters in this group.
   */
  getChildren(): FilterInterface[] {
    return this.children;
  }

  getValue(): any {
    throw new Error("Method not implemented for groups.");
  }
  loadOptions(): Promise<any> {
    throw new Error("Method not implemented for groups.");
  }
  getOptions(): any {
    throw new Error("Method not implemented for groups.");
  }
  getActiveValue(): string | null {
    throw new Error("Method not implemented for groups.");
  }
  getSelectionMode(): SelectionMode {
    throw new Error("Method not implemented for groups.");
  }
  getIdParamName(): string {
    throw new Error("Method not implemented for groups.");
  }
  getLabelParamName(): string {
    throw new Error("Method not implemented for groups.");
  }
  getParentKey(): string {
    throw new Error("Method not implemented for groups.");
  }
  getParentIdParamName(): string {
    throw new Error("Method not implemented for groups.");
  }
  getParentLabelParamName(): string {
    throw new Error("Method not implemented for groups.");
  }
  getParentKeyEntity(): string {
    throw new Error("Method not implemented for groups.");
  }
  getParentConditionalOperator(): ConditionalOperator {
    throw new Error("Method not implemented for groups.");
  }
  getParentConnectionOperator(): ConnectionOperator {
    throw new Error("Method not implemented for groups.");
  }
  getParentDenialOperator(): boolean {
    throw new Error("Method not implemented for groups.");
  }
} 