import { BaseSubmitHandler } from "./BaseSubmitHandler";
import { RecuperacaoSenha } from "@global/request/builder/RecuperacaoSenha";
import { RecuperacaoSenha as ResponseHandler } from "@global/request/response/handler/RecuperacaoSenha";
import { FormHandlerProps } from "@global/type/form/handler/FormHandlerProps";

export class RecuperacaoSenhaHandler extends BaseSubmitHandler {
  constructor({ entity, needsAuthorization, responseHandler }: FormHandlerProps) {
    const finalResponseHandler = responseHandler || new ResponseHandler();
    super({ entity, needsAuthorization, responseHandler: finalResponseHandler });
  }

  protected createRequestBuilder(props: any) {
    return new RecuperacaoSenha(props);
  }
}
