import { FormatterInterface } from "./FormatterInterface";

export class DateBRFormatter implements FormatterInterface<string> {
  format(value: string): string {
    if (!value) return "";
    const [year, month, day] = value.split("-");
    if (!year || !month || !day) return value;
    return `${day}/${month}/${year}`;
  }
} 