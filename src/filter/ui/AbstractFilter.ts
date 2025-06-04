import FilterInterface from "./FilterInterface";

export default abstract class AbstractFilter implements FilterInterface {
  key: string;
  label: string;
  type: string;

  constructor(key: string, label: string, type: string) {
    this.key = key;
    this.label = label;
    this.type = type;
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

  abstract getValue(): any;

  abstract loadOptions(): Promise<any>;

  abstract getOptions(): any;
}
