import { ResponseHandler } from "./Handler";
import { GeracaoNovaSenhaResponse } from "@global/type/request/response/handler/GeracaoNovaSenha";
import { ResponseHandlerProps } from "@global/type/request/response/handler/ResponseHandlerProps";

export class GeracaoNovaSenha extends ResponseHandler {
  constructor({
    successMessage = "Senha alterada com sucesso!",
    errorHandlerCollection,
    onSuccessCallback,
    onSuccessActions,
  }: ResponseHandlerProps<GeracaoNovaSenhaResponse> = {}) {
    super({
      errorHandlerCollection,
      onSuccessCallback,
      onSuccessActions,
      successMessage,
    });
  }
}
