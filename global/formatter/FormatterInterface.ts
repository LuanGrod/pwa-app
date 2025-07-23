export interface FormatterInterface<T = any> {
  format(value: T): string;
} 