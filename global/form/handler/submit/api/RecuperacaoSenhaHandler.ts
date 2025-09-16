import { RecuperacaoSenha } from "@global/request/builder/api/RecuperacaoSenha";
import { RecuperacaoSenha as ResponseHandler } from "@global/request/response/handler/api/RecuperacaoSenha";
import { RecuperacaoSenhaHandler as FormHandler } from "../RecuperacaoSenhaHandler";
import { FormHandlerProps } from "@global/type/form/handler/FormHandlerProps";

export class RecuperacaoSenhaHandler extends FormHandler {
  constructor({ entity, needsAuthorization, responseHandler }: FormHandlerProps) {
    const finalResponseHandler = responseHandler || new ResponseHandler();
    super({ entity, needsAuthorization, responseHandler: finalResponseHandler });
  }

  protected createRequestBuilder(props: any) {
    return new RecuperacaoSenha(props);
  }
}
