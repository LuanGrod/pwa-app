import { FilterInterface } from "./FilterInterface";

export class StripTags implements FilterInterface {
  apply(value: string): string {
    return value.replace(/<[^>]*>/g, "");
  }
}
