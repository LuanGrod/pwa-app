import { DefaultApi as DefaultErrorHandlerCollection } from "@global/request/error/handler/collection/DefaultApi";
import { ResponseHandler } from "../Handler";
import { UpdateResponse } from "@global/type/request/response/handler/Update";
import { ApiResponseHandlerProps } from "@global/type/request/response/handler/ApiResponseHandlerProps";

export class Update<T = any> extends ResponseHandler {
  constructor({
    successMessage = "Edição realizada com sucesso!",
    onSuccessCallback,
    onSuccessActions
  }: ApiResponseHandlerProps<UpdateResponse<T>> = {}) {
    super({
      successMessage,
      errorHandlerCollection: new DefaultErrorHandlerCollection(),
      onSuccessCallback,
      onSuccessActions
    });
  }
}
