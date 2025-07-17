import AbstractFilter from "./AbstractFilter";
import FilterInterface, { ConnectionOperator, ConditionalOperator } from "./FilterInterface";
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

  // Abstract method implementations (not used for groups)
  getValue(): any {
    return [];
  }

  loadOptions(): Promise<any> {
    return Promise.resolve(null);
  }

  getOptions(): any {
    return null;
  }

  getActiveValue(): string | null {
    return null;
  }

  getIdParamName(): string {
    throw new Error("Method not implemented for groups.");
  }

  getLabelParamName(): string {
    throw new Error("Method not implemented for groups.");
  }

  getParentKey(): string {
    return "";
  }

  getParentIdParamName(): string {
    return "";
  }

  getParentLabelParamName(): string {
    return "";
  }

  getParentKeyEntity(): string {
    return "";
  }

  getParentConditionalOperator(): ConditionalOperator {
    throw new Error("Method not implemented for groups.");
  }

  getParentConnectionOperator(): ConnectionOperator {
    throw new Error("Method not implemented for groups.");
  }

  getParentDenialOperator(): boolean {
    return false;
  }
} 