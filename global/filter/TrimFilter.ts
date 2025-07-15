import { FilterInterface } from "./FilterInterface";

export class TrimFilter implements FilterInterface {
  apply(value: string): string {
    return value.trim();
  }
}
