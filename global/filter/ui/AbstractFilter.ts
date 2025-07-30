import FilterInterface, {
  ConditionalOperator,
  ConnectionOperator,
  DEFAULT_VALUES,
  FilterType,
  SelectionMode,
} from "./FilterInterface";
import { FilterFragment } from "../StringAssembler";

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
    return DEFAULT_VALUES.BOOLEAN_ACTIVE;
  }

  getParentConditionalOperator(): ConditionalOperator {
    return DEFAULT_VALUES.SELECT_CONDITIONAL_OPERATOR;
  }

  getParentConnectionOperator(): ConnectionOperator {
    return DEFAULT_VALUES.CONNECTION_OPERATOR;
  }

  getParentDenialOperator(): boolean {
    return DEFAULT_VALUES.DENIAL_OPERATOR;
  }

  getSelectionMode(): SelectionMode {
    return DEFAULT_VALUES.SELECTION_MODE as SelectionMode;
  }

  getLabelFields(): string[] {
    return [];
  }

  getCustomOptionComponent(): string {
    return "";
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
