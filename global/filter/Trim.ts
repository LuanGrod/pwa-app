import { FilterInterface } from "./FilterInterface";

export class Trim implements FilterInterface {
  apply(value: string): string {
    return value.trim();
  }
}
