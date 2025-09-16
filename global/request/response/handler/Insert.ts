import { ResponseHandler } from "./Handler";
import { InsertResponse } from "@global/type/request/response/handler/actions/Insert";
import { ResponseHandlerProps } from "@global/type/request/response/handler/ResponseHandlerProps";

export class Insert extends ResponseHandler {
  constructor({
    successMessage = "Cadastro realizado com sucesso!",
    errorHandlerCollection,
    onSuccessCallback,
    onSuccessActions,
  }: ResponseHandlerProps<InsertResponse> = {}) {
    super({
      errorHandlerCollection,
      onSuccessCallback,
      onSuccessActions,
      successMessage,
    });
  }
}
