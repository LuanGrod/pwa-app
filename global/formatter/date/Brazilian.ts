import { FormatterInterface } from "../FormatterInterface";

export class BrazilianDateFormatter implements FormatterInterface<string> {
  format(value: string): string {
    if (!value) return "";
    const date = new Date(value);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  shortFormatMonth(value: string): string {
    if (!value) return "";
    const date = new Date(value);
    const monthAbbr = [
      "JAN", "FEV", "MAR", "ABR", "MAI", "JUN",
      "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"
    ];
    return monthAbbr[date.getMonth()];
  }


  shortFormatYear(value: string): string {
    if (!value) return "";
    const date = new Date(value);
    return date.getFullYear().toString();
  }
}
