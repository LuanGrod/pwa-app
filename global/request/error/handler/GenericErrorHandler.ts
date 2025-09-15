import { AbstractErrorHandler } from "./AbstractErrorHandler";

export class GenericErrorHandler extends AbstractErrorHandler {
  protected processError(error: Error): string[] | null {
    return [this.msg];
  }
}
