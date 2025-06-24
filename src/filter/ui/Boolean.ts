import AbstractFilter from "./AbstractFilter";

export default class Boolean extends AbstractFilter {
  constructor(queryField: string, label: string, activeValue?: string, key?: string) {
    super(queryField, label, "boolean", key);
    this.activeValue = activeValue || "1";
  }

  getValue(): boolean {
    return false;
  }

  loadOptions(): Promise<any> {
    return Promise.resolve(null);
  }

  getOptions(): any {
    return null;
  }
}
