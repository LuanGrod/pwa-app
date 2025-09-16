import { Update } from "@global/request/builder/api/Update";
import { Update as ResponseHandler } from "@global/request/response/handler/api/Update";
import { UpdateHandler as FormHandler } from "../UpdateHandler";
import { FormHandlerProps } from "@global/type/form/handler/FormHandlerProps";

export class UpdateHandler extends FormHandler {
  constructor({ entity, needsAuthorization, responseHandler }: FormHandlerProps) {
    const finalResponseHandler = responseHandler || new ResponseHandler();
    super({ entity, needsAuthorization, responseHandler: finalResponseHandler });
  }

  protected createRequestBuilder(props: any) {
    return new Update(props);
  }
}
