import { ResponseHandlerInterface } from "@global/request/response/handler/HandlerInterface";
import { Update } from "@global/request/builder/api/Update";
import { Update as ResponseHandler } from "@global/request/response/handler/api/Update";
import { UpdateHandler as FormHandler } from "../UpdateHandler";

type UpdateHandlerProps = {
  entity: string;
  needsAuthorization?: boolean;
  responseHandler?: ResponseHandlerInterface | null;
};

export class UpdateHandler extends FormHandler {
  constructor({ entity, needsAuthorization, responseHandler = null }: UpdateHandlerProps) {
    responseHandler = responseHandler || new ResponseHandler({});
    super({ entity, needsAuthorization, responseHandler });
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
