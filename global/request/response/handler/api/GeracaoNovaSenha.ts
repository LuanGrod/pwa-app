import { DefaultApi as DefaultErrorHandlerCollection } from "@global/request/error/handler/collection/DefaultApi";
import { ResponseHandler } from "../Handler";
import { GeracaoNovaSenhaResponse } from "@global/type/request/response/handler/GeracaoNovaSenha";
import { ApiResponseHandlerProps } from "@global/type/request/response/handler/ApiResponseHandlerProps";

export class GeracaoNovaSenha extends ResponseHandler {
  constructor({
    successMessage = "Senha alterada com sucesso!",
    onSuccessCallback,
    onSuccessActions,
  }: ApiResponseHandlerProps<GeracaoNovaSenhaResponse> = {}) {
    super({
      successMessage,
      errorHandlerCollection: new DefaultErrorHandlerCollection(),
      onSuccessCallback,
      onSuccessActions,
    });
  }
}
