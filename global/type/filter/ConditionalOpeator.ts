import { ArrayFilterOperation } from "./ArrayFilterOperation";
import { BooleanFilterOperation } from "./BooleanFilterOperation";
import { NumericFilterOperation } from "./NumericFilterOperation";
import { StringFilterOperation } from "./StringFilterOperation";

export type ConditionalOperator =
  | NumericFilterOperation
  | ArrayFilterOperation
  | StringFilterOperation
  | BooleanFilterOperation;
