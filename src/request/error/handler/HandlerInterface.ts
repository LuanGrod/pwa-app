export interface HandlerInterface {
  handle(error: Error): string[] | null;
}
