import { ResponseHandler } from "./Handler";
import { RecuperacaoSenhaResponse } from "@global/type/request/RecuperacaoSenha";
import { ResponseHandlerProps } from "@global/type/request/ResponseHandlerProps";

export class RecuperacaoSenha extends ResponseHandler {
  constructor({
    successMessage = "Email de recuperação enviado com sucesso!",
    errorHandlerCollection,
    onSuccessCallback,
    onSuccessActions,
  }: ResponseHandlerProps<RecuperacaoSenhaResponse> = {}) {
    super({
      errorHandlerCollection,
      onSuccessCallback,
      onSuccessActions,
      successMessage,
    });
  }
}
