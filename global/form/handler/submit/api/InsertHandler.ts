import { Insert } from "@global/request/builder/api/Insert";
import { Insert as ResponseHandler } from "@global/request/response/handler/api/Insert";
import { InsertHandler as FormHandler } from "../InsertHandler";
import { FormHandlerProps } from "@global/type/form/handler/FormHandlerProps";

export class InsertHandler extends FormHandler {
  constructor({ entity, needsAuthorization, responseHandler }: FormHandlerProps) {
    const finalResponseHandler = responseHandler || new ResponseHandler();
    super({ entity, needsAuthorization, responseHandler: finalResponseHandler });
  }

  protected createRequestBuilder(props: any) {
    return new Insert(props);
  }
}
