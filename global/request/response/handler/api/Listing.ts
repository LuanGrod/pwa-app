import { DefaultApi as DefaultErrorHandlerCollection } from "@global/request/error/handler/collection/DefaultApi";
import { ResponseHandler } from "../Handler";
import { ApiResponseHandlerProps } from "@global/type/request/ApiResponseHandlerProps";

export class Listing<T = any> extends ResponseHandler {
  constructor({
    successMessage,
    onSuccessCallback,
    onSuccessActions,
  }: ApiResponseHandlerProps<T> = {}) {
    super({
      successMessage,
      errorHandlerCollection: new DefaultErrorHandlerCollection(),
      onSuccessCallback,
      onSuccessActions,
    });
  }
}
