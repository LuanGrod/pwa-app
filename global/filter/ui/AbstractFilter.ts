import FilterInterface from "./FilterInterface";
import { FilterFragment } from "../StringAssembler";
import { ComponentType } from "react";
import { ConditionalOperator } from "@global/type/filter/ConditionalOpeator";
import { ConnectionOperator } from "@global/type/filter/ConnectionOperator";
import { FilterType } from "@global/type/filter/FilterType";
import { DEFAULT_FILTER_VALUES } from "@global/constants/filter/ui/Values";
import { SelectionMode } from "@global/type/filter/SelectionMode";

export default abstract class AbstractFilter implements FilterInterface {
  queryField: string;
  label: string;
  type: FilterType;
  queryFieldEntity: string;
  key: string;
  conditionalOperator: ConditionalOperator;
  connectionOperator: ConnectionOperator;
  denialOperator: boolean = false;

  constructor(
    queryField: string,
    label: string,
    type: FilterType,
    conditionalOperator: ConditionalOperator,
    connectionOperator: ConnectionOperator,
    denialOperator: boolean,
    key?: string,
    queryFieldEntity?: string,
  ) {
    this.queryField = queryField;
    this.label = label;
    this.type = type;
    this.conditionalOperator = conditionalOperator;
    this.connectionOperator = connectionOperator;
    this.denialOperator = denialOperator;
    this.key = key || queryField;
    this.queryFieldEntity = queryFieldEntity || "";
  }

  abstract getFilterFragment(values: Record<string, any>): FilterFragment[];

  async loadOptions(): Promise<any> {
    return Promise.resolve(null);
  }

  getOptions(): any[] {
    return [];
  }

  getInitialValue(): any {
    return "";
  }

  getIdParamName(): string {
    return "";
  }

  getLabelParamName(): string {
    return "";
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

  getActiveValue(): string {
    return DEFAULT_FILTER_VALUES.BOOLEAN_ACTIVE as string;
  }

  getParentConditionalOperator(): ConditionalOperator {
    return DEFAULT_FILTER_VALUES.SELECT_CONDITIONAL_OPERATOR as ConditionalOperator;
  }

  getParentConnectionOperator(): ConnectionOperator {
    return DEFAULT_FILTER_VALUES.CONNECTION_OPERATOR as ConnectionOperator;
  }

  getParentDenialOperator(): boolean {
    return DEFAULT_FILTER_VALUES.DENIAL_OPERATOR as boolean;
  }

  getSelectionMode(): SelectionMode {
    return DEFAULT_FILTER_VALUES.SELECTION_MODE as SelectionMode;
  }

  getLabelFields(): string[] {
    return [];
  }

  getCustomOptionComponent(): ComponentType<any> | null {
    return null;
  }

  isGroup(): boolean {
    return false;
  }

  getChildren(): FilterInterface[] {
    return [];
  }

  getQueryField(): string {
    return this.queryField;
  }

  getKey(): string {
    return this.key;
  }

  getLabel(): string {
    return this.label;
  }

  getType(): FilterType {
    return this.type;
  }

  getConditionalOperator(): ConditionalOperator {
    return this.conditionalOperator;
  }

  getConnectionOperator(): ConnectionOperator {
    return this.connectionOperator;
  }

  getDenialOperator(): boolean {
    return this.denialOperator;
  }

  getQueryFieldEntity(): string {
    return this.queryFieldEntity;
  }

  getHasClearFilter(): boolean {
    return true;
  }

  getHasSearch(): boolean {
    return true;
  }
}
