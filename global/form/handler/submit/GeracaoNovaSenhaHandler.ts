import { BaseSubmitHandler } from "./BaseSubmitHandler";
import { GeracaoNovaSenha } from "@global/request/builder/GeracaoNovaSenha";
import { GeracaoNovaSenha as ResponseHandler } from "@global/request/response/handler/GeracaoNovaSenha";
import { FormHandlerProps } from "@global/type/form/handler/FormHandlerProps";

export class GeracaoNovaSenhaHandler extends BaseSubmitHandler {
  constructor({
    entity,
    needsAuthorization,
    responseHandler,
  }: FormHandlerProps) {
    const finalResponseHandler = responseHandler || new ResponseHandler();
    super({ entity, needsAuthorization, responseHandler: finalResponseHandler });
  }

  protected createRequestBuilder(props: any) {
    return new GeracaoNovaSenha(props);
  }
}
