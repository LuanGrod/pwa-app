import { FormatterInterface } from "./FormatterInterface";

export class PhoneBRFormatter implements FormatterInterface<string> {
  format(value: string): string {
    if (!value) return "";
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, "");
    if (digits.length === 11) {
      // Mobile: (00) 00000-0000
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
    } else if (digits.length === 10) {
      // Landline: (00) 0000-0000
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    }
    return value;
  }
} 