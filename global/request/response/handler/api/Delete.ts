import { DefaultApi as DefaultErrorHandlerCollection } from "@global/request/error/handler/collection/DefaultApi";
import { ResponseHandler } from "../Handler";
import { DeleteResponse } from "@global/type/request/Delete";
import { ApiResponseHandlerProps } from "@global/type/request/ApiResponseHandlerProps";

export class Delete extends ResponseHandler {
  constructor({
    successMessage = "Exclusão realizada com sucesso!",
    onSuccessCallback,
    onSuccessActions,
  }: ApiResponseHandlerProps<DeleteResponse> = {}) {
    super({
      successMessage,
      errorHandlerCollection: new DefaultErrorHandlerCollection(),
      onSuccessCallback,
      onSuccessActions,
    });
  }
}
