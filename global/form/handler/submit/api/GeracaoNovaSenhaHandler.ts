import { GeracaoNovaSenhaHandler as FormHandler } from "../GeracaoNovaSenhaHandler";
import { GeracaoNovaSenha } from "@global/request/builder/api/GeracaoNovaSenha";
import { GeracaoNovaSenha as ResponseHandler } from "@global/request/response/handler/api/GeracaoNovaSenha";
import { FormHandlerProps } from "@global/type/form/handler/FormHandlerProps";

export class GeracaoNovaSenhaHandler extends FormHandler {
  constructor({ entity, needsAuthorization, responseHandler }: FormHandlerProps) {
    const finalResponseHandler = responseHandler || new ResponseHandler();
    super({ entity, needsAuthorization, responseHandler: finalResponseHandler });
  }

  protected createRequestBuilder(props: any) {
    return new GeracaoNovaSenha(props);
  }
}
