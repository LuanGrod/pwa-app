import { ResponseHandler } from "./Handler";
import { ResponseHandlerProps } from "@global/type/request/response/handler/ResponseHandlerProps";

export class GetRow<T = any> extends ResponseHandler {
  constructor({
    successMessage,
    errorHandlerCollection,
    onSuccessCallback,
    onSuccessActions,
  }: ResponseHandlerProps<T> = {}) {
    super({
      errorHandlerCollection,
      onSuccessCallback,
      onSuccessActions,
      successMessage,
    });
  }
}
