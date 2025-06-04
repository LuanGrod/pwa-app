import { HandlerInterface } from "./HandlerInterface";

export class Handler implements HandlerInterface {
  protected errorContent: string;
  protected msg: string;

  constructor({ errorContent, msg }: { errorContent: string, msg: string }) {
    this.errorContent = errorContent;
    this.msg = msg;
  }

  handle(error: Error): string|null {
    if (error.message.includes(this.errorContent)) {
      return this.msg;
    }

    return null;
  }
}
