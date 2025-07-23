import { ResponseHandlerInterface } from "@global/request/response/handler/HandlerInterface";
import SubmitHandlerInterface from "./SubmitHandlerInterface";
import { Update } from "@global/request/builder/Update";
import { Update as ResponseHandler } from "@global/request/response/handler/Update";

type UpdateHandlerProps = {
  entity: string;
  needsAuthorization?: boolean;
  responseHandler?: ResponseHandlerInterface | null;
};

export class UpdateHandler implements SubmitHandlerInterface {
  protected entity: string;
  protected needsAuthorization: boolean;
  protected responseHandler: ResponseHandlerInterface;

  constructor({ entity, needsAuthorization, responseHandler = null }: UpdateHandlerProps) {
    this.entity = entity;
    this.needsAuthorization = needsAuthorization || false;
    this.responseHandler = responseHandler || new ResponseHandler({});
  }

  async onSubmit(values: any, id: string): Promise<any> {
    const updateRequestBuilder = new Update({
      entity: this.entity,
      data: values,
      id: id,
      responseHandler: this.responseHandler,
    });

    return await updateRequestBuilder.build(this.needsAuthorization);
  }
}
