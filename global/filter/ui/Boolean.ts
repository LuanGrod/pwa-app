import AbstractFilter from "./AbstractFilter";
import { FilterFragment } from "../StringAssembler";
import { ConditionalOperator } from "@global/type/filter/ConditionalOpeator";
import { ConnectionOperator } from "@global/type/filter/ConnectionOperator";
import { DEFAULT_FILTER_VALUES } from "@global/constants/filter/ui/Values";

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
      conditionalOperator ||
        (DEFAULT_FILTER_VALUES.BOOLEAN_CONDITIONAL_OPERATOR as ConditionalOperator),
      connectionOperator || (DEFAULT_FILTER_VALUES.CONNECTION_OPERATOR as ConnectionOperator),
      denialOperator || (DEFAULT_FILTER_VALUES.DENIAL_OPERATOR as boolean),
      key,
      queryFieldEntity
    );
    this.activeValue = activeValue || (DEFAULT_FILTER_VALUES.BOOLEAN_ACTIVE as string);
  }

  getActiveValue(): string {
    return this.activeValue;
  }

  getInitialValue(): any {
    return "";
  }

  getFilterFragment(values: Record<string, any>): FilterFragment[] {
    if (values[this.key] !== this.activeValue) return [];
    const queryFieldEntity = this.queryFieldEntity ? `${this.queryFieldEntity}_` : "";
    let currentFilter = `${queryFieldEntity}${this.queryField}_0{${this.conditionalOperator}}${this.activeValue}`;
    currentFilter = this.denialOperator ? `!(${currentFilter})` : currentFilter;
    return [{ value: currentFilter, connector: this.connectionOperator }];
  }
}
