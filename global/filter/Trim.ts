import { FilterInterface } from "./FilterInterface";

export class Trim implements FilterInterface {

  apply(value: string): string {
    if (value === null || value === undefined) {
      return "";
    }

    const stringValue = String(value);

    return stringValue.trim();
  }
}
