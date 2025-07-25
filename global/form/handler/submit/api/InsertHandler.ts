import { ResponseHandlerInterface } from "@global/request/response/handler/HandlerInterface";
import { Insert } from "@global/request/builder/api/Insert";
import { Insert as ResponseHandler } from "@global/request/response/handler/api/Insert";
import { InsertHandler as FormHandler } from "../InsertHandler";

type InsertHandlerProps = {
  entity: string;
  needsAuthorization?: boolean;
  responseHandler?: ResponseHandlerInterface | null;
};

export class InsertHandler extends FormHandler {
  constructor({ entity, needsAuthorization, responseHandler = null }: InsertHandlerProps) {
    responseHandler = responseHandler || new ResponseHandler({});
    super({ entity, needsAuthorization, responseHandler });
  }

  async onSubmit(values: any, id?: string): Promise<any> {
    const insertRequestBuilder = new Insert({
      entity: this.entity,
      body: values,
      responseHandler: this.responseHandler,
    });

    return await insertRequestBuilder.build(this.needsAuthorization);
  }
}
