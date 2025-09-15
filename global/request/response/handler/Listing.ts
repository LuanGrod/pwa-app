import { ResponseHandler } from "./Handler";
import { ResponseHandlerProps } from "@global/type/request/ResponseHandlerProps";

export class Listing<T = any> extends ResponseHandler {
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
