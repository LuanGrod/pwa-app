import { FilterInterface } from "./FilterInterface";

export class StripTagsFilter implements FilterInterface {
  apply(value: string): string {
    return value.replace(/<[^>]*>/g, "");
  }
}
