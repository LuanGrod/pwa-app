import { BaseSubmitHandler } from "./BaseSubmitHandler";
import { Insert } from "@global/request/builder/Insert";
import { Insert as ResponseHandler } from "@global/request/response/handler/Insert";
import { FormHandlerProps } from "@global/type/form/handler/FormHandlerProps";

export class InsertHandler extends BaseSubmitHandler {
  constructor({ entity, needsAuthorization, responseHandler }: FormHandlerProps) {
    const finalResponseHandler = responseHandler || new ResponseHandler();
    super({ entity, needsAuthorization, responseHandler: finalResponseHandler });
  }

  protected createRequestBuilder(props: any) {
    return new Insert(props);
  }
}
