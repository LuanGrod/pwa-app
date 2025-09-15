import { HandlerInterface } from "./HandlerInterface";

export abstract class AbstractErrorHandler implements HandlerInterface {
  protected errorContent: string;
  protected msg: string;

  constructor({ errorContent, msg }: { errorContent: string; msg: string }) {
    this.errorContent = errorContent;
    this.msg = msg;
  }

  handle(error: Error): string[] | null {
    if (error.message.includes(this.errorContent)) {
      return this.processError(error);
    }
    return null;
  }

  protected abstract processError(error: Error): string[] | null;
}
