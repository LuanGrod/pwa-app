import FilterInterface, { ConditionalOperator, ConnectionOperator } from "./FilterInterface";

export default abstract class AbstractFilter implements FilterInterface {
  queryField: string;
  label: string;
  type: string;
  queryFieldEntity: string;
  key: string;
  conditionalOperator: ConditionalOperator;
  connectionOperator: ConnectionOperator;
  denialOperator: boolean = false;

  constructor(
    queryField: string,
    label: string,
    type: string,
    key?: string,
    queryFieldEntity?: string,
    conditionalOperator?: ConditionalOperator,
    connectionOperator?: ConnectionOperator,
    denialOperator?: boolean
  ) {
    this.queryField = queryField;
    this.label = label;
    this.type = type;
    this.queryFieldEntity = queryFieldEntity || "";
    this.conditionalOperator = conditionalOperator || "eq";
    this.connectionOperator = connectionOperator || "and";
    this.denialOperator = denialOperator || false;
    this.key = key || queryField;
  }

  abstract getValue(): any;

  abstract loadOptions(): Promise<any>;

  abstract getOptions(): any;

  abstract getIdParamName(): string;

  abstract getLabelParamName(): string;

  abstract getParentKey(): string;

  abstract getParentIdParamName(): string;

  abstract getParentLabelParamName(): string;

  abstract getParentKeyEntity(): string;

  abstract getActiveValue(): string | null;

  abstract getParentConditionalOperator(): ConditionalOperator;

  abstract getParentConnectionOperator(): ConnectionOperator;

  abstract getParentDenialOperator(): boolean;

  getQueryField(): string {
    return this.queryField;
  }

  getKey(): string {
    return this.key;
  }

  getLabel(): string {
    return this.label;
  }

  getType(): string {
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
}
