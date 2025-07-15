import { HandlerInterface } from "./HandlerInterface";

export class Handler implements HandlerInterface {
  protected errorContent: string;
  protected msg: string;

  constructor({ errorContent, msg }: { errorContent: string; msg: string }) {
    this.errorContent = errorContent;
    this.msg = msg;
  }

  handle(error: Error): string[] | null {
    if (error.message.includes(this.errorContent)) {
      const apiResponse = error.cause as Record<string, any>;
      const msgKeys = Object.keys(apiResponse.msg);
      if (msgKeys.length > 0) {
        let msgValues: string[] = [];
        msgKeys.map((key: any) => {
          msgValues.push(apiResponse.msg[key][0]);
        });

        return msgValues;
      } else {
        return [this.msg];
      }
    }

    return null;
  }
}
