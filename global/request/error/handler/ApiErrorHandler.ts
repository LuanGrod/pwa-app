import { AbstractErrorHandler } from "./AbstractErrorHandler";

export class ApiErrorHandler extends AbstractErrorHandler {
  protected processError(error: Error): string[] | null {
    const apiResponse = error.cause as Record<string, any>;

    if (typeof apiResponse.msg === "object" && apiResponse.msg !== null) {
      const msgKeys = Object.keys(apiResponse.msg);

      let msgValues: string[] = [];
      msgKeys.map((key: any) => {
        msgValues.push(apiResponse.msg[key][0]);
      });

      return msgValues;
    } else if (typeof apiResponse.msg === "string") {
      return [apiResponse.msg];
    } else {
      return [this.msg];
    }
  }
}
