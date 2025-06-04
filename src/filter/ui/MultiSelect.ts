import AbstractFilter from "./AbstractFilter";
import { Listing } from "@request/builder/Listing";

export default class MultiSelect extends AbstractFilter {
  options: string[];
  entity: string;

  constructor(key: string, label: string, entity: string) {
    super(key, label, "multi-select");
    this.options = [];
    this.entity = entity;
  }

  async loadOptions() {
    const listing = new Listing({ entity: this.entity });
    const result = await listing.build();
    this.options = result.data || [];
  }

  getOptions(): any {
    return this.options;
  }

  getValue(): string[] {
    return [];
  }
}
