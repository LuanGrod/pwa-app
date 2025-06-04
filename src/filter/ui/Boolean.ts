import AbstractFilter from "./AbstractFilter";

export default class Boolean extends AbstractFilter {
  constructor(key: string, label: string) {
    super(key, label, "boolean");
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
