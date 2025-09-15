import { ResponseHandler } from "./Handler";
import { InsertResponse } from "@global/type/request/Insert";
import { ResponseHandlerProps } from "@global/type/request/ResponseHandlerProps";

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
