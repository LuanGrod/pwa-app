import { ResponseHandlerInterface } from "@global/request/response/handler/HandlerInterface";
import SubmitHandlerInterface from "./SubmitHandlerInterface";
import { Insert } from "@global/request/builder/Insert";
import { Insert as ResponseHandler } from "@global/request/response/handler/Insert";

type InsertHandlerProps = {
  entity: string;
  needsAuthorization?: boolean;
  responseHandler?: ResponseHandlerInterface | null;
};

export class InsertHandler implements SubmitHandlerInterface {
  protected entity: string;
  protected needsAuthorization: boolean;
  protected responseHandler: ResponseHandlerInterface;

  constructor({ entity, needsAuthorization, responseHandler = null }: InsertHandlerProps) {
    this.entity = entity;
    this.needsAuthorization = needsAuthorization || false;
    this.responseHandler = responseHandler || new ResponseHandler({});
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
