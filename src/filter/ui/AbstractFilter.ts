import FilterInterface from "./FilterInterface";

export default abstract class AbstractFilter implements FilterInterface {
  queryField: string;
  label: string;
  type: string;
  activeValue: string | undefined | null;
  key: string;

  constructor(queryField: string, label: string, type: string, key?: string) {
    this.queryField = queryField;
    this.label = label;
    this.type = type;
    this.activeValue = null;
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

  abstract getQueryFieldEntity(): string | null;

  abstract getParentKeyEntity(): string | null;

  getQueryField(): string {
    return this.queryField;
  }

  getActiveValue(): string {
    return this.activeValue || "";
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
}
