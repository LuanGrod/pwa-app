import { DefaultApi as DefaultErrorHandlerCollection } from "@global/request/error/handler/collection/DefaultApi";
import { ResponseHandler } from "../Handler";
import { RecuperacaoSenhaResponse } from "@global/type/request/response/handler/actions/RecuperacaoSenha";
import { ApiResponseHandlerProps } from "@global/type/request/response/handler/ApiResponseHandlerProps";

export class RecuperacaoSenha extends ResponseHandler {
  constructor({
    successMessage = "Email de recuperação enviado com sucesso!",
    onSuccessCallback,
    onSuccessActions,
  }: ApiResponseHandlerProps<RecuperacaoSenhaResponse> = {}) {
    super({
      successMessage,
      errorHandlerCollection: new DefaultErrorHandlerCollection(),
      onSuccessCallback,
      onSuccessActions,
    });
  }
}
