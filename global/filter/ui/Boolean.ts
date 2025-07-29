import AbstractFilter from "./AbstractFilter";
import FilterInterface, {
  ConditionalOperator,
  ConnectionOperator,
  SelectionMode,
} from "./FilterInterface";
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

  getActiveValue(): string | null {
    return this.activeValue || null;
  }

  /**
   * Builds the filter fragment for this boolean filter.
   * Returns an array (empty or one element).
   */
  getFilterFragment(values: Record<string, any>): FilterFragment[] {
    if (values[this.queryField] !== this.activeValue) return [];
    const queryFieldEntity = this.queryFieldEntity ? `${this.queryFieldEntity}_` : "";
    let currentFilter = `${queryFieldEntity}${this.queryField}_0{${this.conditionalOperator}}${this.activeValue}`;
    currentFilter = this.denialOperator ? `!(${currentFilter})` : currentFilter;
    return [{ value: currentFilter, connector: this.connectionOperator }];
  }

  loadOptions(): Promise<any> {
    throw new Error("Method not implemented for boolean.");
  }
  getOptions(): any {
    throw new Error("Method not implemented for boolean.");
  }
  getSelectionMode(): SelectionMode {
    throw new Error("Method not implemented for boolean.");
  }
  getIdParamName(): string {
    throw new Error("Method not implemented for boolean.");
  }
  getLabelParamName(): string {
    throw new Error("Method not implemented for boolean.");
  }
  getParentKey(): string {
    throw new Error("Method not implemented for boolean.");
  }
  getParentIdParamName(): string {
    throw new Error("Method not implemented for boolean.");
  }
  getParentLabelParamName(): string {
    throw new Error("Method not implemented for boolean.");
  }
  getParentKeyEntity(): string {
    throw new Error("Method not implemented for boolean.");
  }
  getParentConditionalOperator(): ConditionalOperator {
    throw new Error("Method not implemented for boolean.");
  }
  getParentConnectionOperator(): ConnectionOperator {
    throw new Error("Method not implemented for boolean.");
  }
  getParentDenialOperator(): boolean {
    throw new Error("Method not implemented for boolean.");
  }
  getLabelFields(): string[] {
    throw new Error("Method not implemented for boolean.");
  }
  getCustomComponent(): string {
    throw new Error("Method not implemented for boolean.");
  }
}
