import { BaseSubmitHandler } from "./BaseSubmitHandler";
import { Update } from "@global/request/builder/Update";
import { Update as ResponseHandler } from "@global/request/response/handler/Update";
import { FormHandlerProps } from "@global/type/form/handler/FormHandlerProps";

export class UpdateHandler extends BaseSubmitHandler {
  constructor({ entity, needsAuthorization, responseHandler }: FormHandlerProps) {
    const finalResponseHandler = responseHandler || new ResponseHandler();
    super({ entity, needsAuthorization, responseHandler: finalResponseHandler });
  }

  protected createRequestBuilder(props: any) {
    return new Update(props);
  }
}
