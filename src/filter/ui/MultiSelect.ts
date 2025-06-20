import AbstractFilter from "./AbstractFilter";
import { Listing } from "@request/builder/Listing";

export default class MultiSelect extends AbstractFilter {
  options: string[];
  entity: string;
  idParamName: string;
  labelParamName: string;
  parentKey: string;
  parentIdParamName: string;
  parentLabelParamName: string;

  constructor(
    key: string,
    label: string,
    entity: string,
    idParamName: string,
    labelParamName: string,
    parentKey?: string,
    parentIdParamName?: string,
    parentLabelParamName?: string
  ) {
    super(key, label, "multi-select");
    this.options = [];
    this.entity = entity;
    this.idParamName = idParamName;
    this.labelParamName = labelParamName;
    this.parentKey = parentKey || "";
    this.parentIdParamName = parentIdParamName || "";
    this.parentLabelParamName = parentLabelParamName || "";
  }

  async loadOptions() {
    const listing = new Listing({ entity: this.entity });
    const result = await listing.build(true);
    this.options = result.data.rows || [];
    console.log(this.options);
  }

  getOptions(): any {
    return this.options;
  }

  getValue(): string[] {
    return [];
  }

  getIdParamName(): string {
    return this.idParamName;
  }

  getLabelParamName(): string {
    return this.labelParamName;
  }

  getParentKey(): string {
    return this.parentKey;
  }

  getParentIdParamName(): string {
    return this.parentIdParamName;
  }

  getParentLabelParamName(): string {
    return this.parentLabelParamName;
  }
}
