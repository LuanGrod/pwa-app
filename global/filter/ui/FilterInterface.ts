import { FilterFragment } from "./FilterStringAssembler";

export type ConnectionOperator = "and" | "or";

type NumbersOperations = "gt" | "geq" | "lt" | "leq" | "eq";
type ArraysOperations = "eq" | "in";
type StringsOperations = "eq" | "lk";
type BooleansOperations = "eq";

export type ConditionalOperator =
  | NumbersOperations
  | ArraysOperations
  | StringsOperations
  | BooleansOperations;

export default interface FilterInterface {
  loadOptions(): Promise<any>;
  getQueryField(): string;
  getKey(): string;
  getLabel(): string;
  getOptions(): any;
  getValue(): any;
  getActiveValue(): any;
  getType(): string;
  getIdParamName(): string;
  getLabelParamName(): string;
  getParentKey(): string;
  getParentIdParamName(): string;
  getParentLabelParamName(): string;
  getQueryFieldEntity(): string;
  getParentKeyEntity(): string;
  getConditionalOperator(): ConditionalOperator;
  getConnectionOperator(): ConnectionOperator;
  getDenialOperator(): boolean;
  getParentConditionalOperator(): ConditionalOperator;
  getParentConnectionOperator(): ConnectionOperator;
  getParentDenialOperator(): boolean;
  /**
   * Returns an array of filter fragments for this filter (can be empty).
   * @param values The current filter values.
   */
  getFilterFragment(
    values: Record<string, any>,
  ): FilterFragment[];
}
