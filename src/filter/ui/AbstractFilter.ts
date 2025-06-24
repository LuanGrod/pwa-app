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

  getIdParamName(): string {
    throw new Error("Method not implemented.");
  }

  getLabelParamName(): string {
    throw new Error("Method not implemented.");
  }

  getParentKey(): string {
    throw new Error("Method not implemented.");
  }

  getParentIdParamName(): string {
    throw new Error("Method not implemented.");
  }

  getParentLabelParamName(): string {
    throw new Error("Method not implemented.");
  }
}
