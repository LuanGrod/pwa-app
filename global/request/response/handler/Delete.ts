import { ResponseHandler } from "./Handler";
import { DeleteResponse } from "@global/type/request/Delete";
import { ResponseHandlerProps } from "@global/type/request/ResponseHandlerProps";

export class Delete extends ResponseHandler {
  constructor({
    successMessage = "Exclusão realizada com sucesso!",
    errorHandlerCollection,
    onSuccessCallback,
    onSuccessActions,
  }: ResponseHandlerProps<DeleteResponse> = {}) {
    super({
      errorHandlerCollection,
      onSuccessCallback,
      onSuccessActions,
      successMessage,
    });
  }
}
