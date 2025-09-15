import { ResponseHandler } from "./Handler";
import { UpdateResponse } from "@global/type/request/Update";
import { ResponseHandlerProps } from "@global/type/request/ResponseHandlerProps";

export class Update<T = any> extends ResponseHandler {
  constructor({
    successMessage = "Edição realizada com sucesso!",
    errorHandlerCollection,
    onSuccessCallback,
    onSuccessActions,
  }: ResponseHandlerProps<UpdateResponse<T>> = {}) {
    super({
      errorHandlerCollection,
      onSuccessCallback,
      onSuccessActions,
      successMessage,
    });
  }
}
