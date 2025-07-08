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
  getQueryFieldEntity(): string | null {
    throw new Error("Method not implemented.");
  }
  getParentKeyEntity(): string | null {
    throw new Error("Method not implemented.");
  }
}
