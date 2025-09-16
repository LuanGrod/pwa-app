import { FilterFragment } from "../StringAssembler";
import { ComponentType } from "react";
import { ConnectionOperator } from "@global/type/filter/ConnectionOperator";
import { ConditionalOperator } from "@global/type/filter/ConditionalOpeator";
import { FilterType } from "@global/type/filter/FilterType";
import { SelectionMode } from "@global/type/filter/SelectionMode";

export default interface FilterInterface {
  /**
   * Loads the filter options, typically from an API or data source.
   * @class Select
   * @default Promise.resolve(null)
   * @returns A promise that resolves with the loaded options.
   */
  loadOptions(): Promise<any>;

  /**
   * Returns the field that is used in the filter query.
   * @default ""
   * @example id_tema => flashcards_id_tema
   * @returns The query field as a string.
   */
  getQueryField(): string;

  /**
   * Returns the unique key for this filter.
   * @default queryField
   * @returns The filter key as a string.
   */
  getKey(): string;

  /**
   * Returns the display label used in the button that opens the filter drawer or button that toggles the boolean filter.
   * @default ""
   * @returns The filter label as a string.
   */
  getLabel(): string;

  /**
   * Returns the available options for this filter.
   * @class Select
   * @default []
   * @returns The filter options as an array of objects.
   */
  getOptions(): any[];

  /**
   * Returns the initial value of the filter.
   * @default Select: [], Boolean: ""
   * @returns The initial value of the filter.
   */
  getInitialValue(): any[];

  /**
   * Returns the value of the boolean filter when active.
   * @class Boolean
   * @default "1"
   * @returns The active value as a string.
   */
  getActiveValue(): string;

  /**
   * Returns the type of this filter.
   * @returns The filter type.
   */
  getType(): FilterType;

  /**
   * Returns the selection mode for this filter (single or multi).
   * @class Select
   * @default "multi"
   * @returns The selection mode.
   */
  getSelectionMode(): SelectionMode;

  /**
   * Returns the parameter name from the API response used for the option ID.
   * @class Select
   * @default ""
   * @returns The ID parameter name as a string.
   */
  getIdParamName(): string;

  /**
   * Returns the parameter name from the API response used for the option label.
   * @class Select
   * @default ""
   * @returns The label parameter name as a string.
   */
  getLabelParamName(): string;

  /**
   * Returns the parent key for hierarchical filters.
   * Also used as the query field for the parent.
   * @class Select
   * @default ""
   * @example id_area => temas_id_area
   * @returns The parent key as a string.
   */
  getParentKey(): string;

  /**
   * Returns the parameter name from the API response used for the parent ID.
   * @class Select
   * @default ""
   * @returns The parent ID parameter name as a string.
   */
  getParentIdParamName(): string;

  /**
   * Returns the parameter name from the API response used for the parent label.
   * @class Select
   * @default ""
   * @returns The parent label parameter name as a string.
   */
  getParentLabelParamName(): string;

  /**
   * Returns the entity associated with the query field to mount the query.
   * @default ""
   * @example flashcards => flashcards_id_tema
   * @returns The query field entity as a string.
   */
  getQueryFieldEntity(): string;

  /**
   * Returns the entity key for the parent in hierarchical filters to mount the query.
   * @class Select
   * @default ""
   * @example temas => temas_id_area
   * @returns The parent key entity as a string.
   */
  getParentKeyEntity(): string;

  /**
   * Returns the conditional operator used by this filter.
   * @default Select: "in", Boolean: "eq"
   * @returns The conditional operator.
   */
  getConditionalOperator(): ConditionalOperator;

  /**
   * Returns the connection operator used to combine this filter with others.
   * @default "and"
   * @returns The connection operator.
   */
  getConnectionOperator(): ConnectionOperator;

  /**
   * Returns whether this filter uses with the denial operator.
   * @class Boolean
   * @default false
   * @returns True if denial operator is used, false otherwise.
   */
  getDenialOperator(): boolean;

  /**
   * Returns the conditional operator for the parent filter.
   * @class Select
   * @default "in"
   * @returns The parent conditional operator.
   */
  getParentConditionalOperator(): ConditionalOperator;

  /**
   * Returns the connection operator for the parent filter.
   * @class Select
   * @default "and"
   * @returns The parent connection operator.
   */
  getParentConnectionOperator(): ConnectionOperator;

  /**
   * Returns whether the parent filter uses a denial operator.
   * @class Select
   * @default false
   * @returns True if parent denial operator is used, false otherwise.
   */
  getParentDenialOperator(): boolean;

  /**
   * Returns an array of filter fragments for this filter.
   * @default []
   * @param values The current filter values.
   * @returns An array of filter fragments.
   */
  getFilterFragment(values: Record<string, any>): FilterFragment[];

  /**
   * Returns if the filter is a group filter.
   * @class Group
   * @default false
   * @returns True if the filter is a group filter, false otherwise.
   */
  isGroup(): boolean;

  /**
   * Returns the child filters of this filter.
   * @class Group
   * @default []
   * @returns An array of child FilterInterface instances.
   */
  getChildren(): FilterInterface[];

  /**
   * Returns an array with the parameter names from the API response.
   * Used to render custom Select Items.
   * @class Select
   * @default []
   * @returns An array of label field names.
   */
  getLabelFields(): string[];

  /**
   * Returns the custom option component used for this filter, if any.
   * @class Select
   * @default null
   * @example AreaFilterItem
   * @returns The custom component or null.
   */
  getCustomOptionComponent(): ComponentType<any> | null;

  /**
   * Returns if the filter has a clear filter button.
   * @class Select
   * @default true
   * @returns True if the filter has a clear filter button, false otherwise.
   */
  getHasClearFilter(): boolean;

  /**
   * Returns if the filter has a search input.
   * @class Select
   * @default true
   * @returns True if the filter has a search input, false otherwise.
   */
  getHasSearch(): boolean;
}
