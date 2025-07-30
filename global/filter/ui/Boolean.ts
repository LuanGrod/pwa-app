import AbstractFilter from "./AbstractFilter";
import {
  ConditionalOperator,
  ConnectionOperator,
  DEFAULT_VALUES,
  FilterType,
} from "./FilterInterface";
import { FilterFragment } from "../StringAssembler";

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
      FilterType.BOOLEAN,
      conditionalOperator || DEFAULT_VALUES.BOOLEAN_CONDITIONAL_PERATOR,
      connectionOperator || DEFAULT_VALUES.CONNECTION_OPERATOR,
      denialOperator || DEFAULT_VALUES.DENIAL_OPERATOR,
      key,
      queryFieldEntity,
    );
    this.activeValue = activeValue || DEFAULT_VALUES.BOOLEAN_ACTIVE;
  }

  getActiveValue(): string {
    return this.activeValue;
  }
  
  getInitialValue(): any {
    return "";
  }

  getFilterFragment(values: Record<string, any>): FilterFragment[] {
    if (values[this.queryField] !== this.activeValue) return [];
    const queryFieldEntity = this.queryFieldEntity ? `${this.queryFieldEntity}_` : "";
    let currentFilter = `${queryFieldEntity}${this.queryField}_0{${this.conditionalOperator}}${this.activeValue}`;
    currentFilter = this.denialOperator ? `!(${currentFilter})` : currentFilter;
    return [{ value: currentFilter, connector: this.connectionOperator }];
  }
}
