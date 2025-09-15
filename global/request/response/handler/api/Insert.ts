import { DefaultApi as DefaultErrorHandlerCollection } from "@global/request/error/handler/collection/DefaultApi";
import { ResponseHandler } from "../Handler";
import { InsertResponse } from "@global/type/request/Insert";
import { ApiResponseHandlerProps } from "@global/type/request/ApiResponseHandlerProps";

export class Insert extends ResponseHandler {
  constructor({
    successMessage = "Cadastro realizado com sucesso!",
    onSuccessCallback,
    onSuccessActions,
  }: ApiResponseHandlerProps<InsertResponse> = {}) {
    super({
      successMessage,
      errorHandlerCollection: new DefaultErrorHandlerCollection(),
      onSuccessCallback,
      onSuccessActions,
    });
  }
}
