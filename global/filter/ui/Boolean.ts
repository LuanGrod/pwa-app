import AbstractFilter from "./AbstractFilter";
import FilterInterface, { ConditionalOperator, ConnectionOperator } from "./FilterInterface";
import { FilterFragment } from "./FilterStringAssembler";

type BooleanProps = {
  queryField: string;
  label: string;
  activeValue?: string;
  key?: string;
  queryFieldEntity?: string;
  conditionalOperator?: ConditionalOperator;
  connectionOperator?: ConnectionOperator;
  denialOperator?: boolean;
};

export default class Boolean extends AbstractFilter {
  activeValue: string;

  constructor({
    label,
    queryField,
    activeValue,
    conditionalOperator,
    connectionOperator,
    denialOperator,
    key,
    queryFieldEntity,
  }: BooleanProps) {
    super(
      queryField,
      label,
      "boolean",
      key,
      queryFieldEntity,
      conditionalOperator,
      connectionOperator,
      denialOperator
    );
    this.activeValue = activeValue || "1";
  }

  getValue(): boolean {
    return false;
  }

  loadOptions(): Promise<any> {
    return Promise.resolve(null);
  }

  getOptions(): any {
    return null;
  }

  getActiveValue(): string | null {
    return this.activeValue || null;
  }

  getIdParamName(): string {
    throw new Error("Method not implemented.");
  }
  getLabelParamName(): string {
    throw new Error("Method not implemented.");
  }
  getParentKey(): string {
    throw new Error("Method not implemented.");
  }
  getParentIdParamName(): string {
    throw new Error("Method not implemented.");
  }
  getParentLabelParamName(): string {
    throw new Error("Method not implemented.");
  }
  getParentKeyEntity(): string {
    throw new Error("Method not implemented.");
  }
  getParentConditionalOperator(): ConditionalOperator {
    throw new Error("Method not implemented.");
  }
  getParentConnectionOperator(): ConnectionOperator {
    throw new Error("Method not implemented.");
  }
  getParentDenialOperator(): boolean {
    throw new Error("Method not implemented.");
  }

  /**
   * Builds the filter fragment for this boolean filter.
   * Returns an array (empty or one element).
   */
  getFilterFragment(
    values: Record<string, any>
  ): FilterFragment[] {
    if (values[this.queryField] !== this.activeValue) return [];
    const queryFieldEntity = this.queryFieldEntity ? `${this.queryFieldEntity}_` : "";
    let currentFilter = `${queryFieldEntity}${this.queryField}_0{${this.conditionalOperator}}${this.activeValue}`;
    currentFilter = this.denialOperator ? `!(${currentFilter})` : currentFilter;
    return [{ value: currentFilter, connector: this.connectionOperator }];
  }
}
