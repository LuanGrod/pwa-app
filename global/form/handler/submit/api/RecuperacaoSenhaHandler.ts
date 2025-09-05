import { ResponseHandlerInterface } from "@global/request/response/handler/HandlerInterface";
import { RecuperacaoSenha } from "@global/request/builder/api/RecuperacaoSenha";
import { RecuperacaoSenha as ResponseHandler } from "@global/request/response/handler/api/RecuperacaoSenha";
import { RecuperacaoSenhaHandler as FormHandler } from "../RecuperacaoSenhaHandler";

type RecuperacaoSenhaHandlerProps = {
  entity?: string | null;
  needsAuthorization?: boolean;
  responseHandler?: ResponseHandlerInterface | null;
};

export class RecuperacaoSenhaHandler extends FormHandler {
  constructor({
    entity,
    needsAuthorization,
    responseHandler = null,
  }: RecuperacaoSenhaHandlerProps) {
    responseHandler = responseHandler || new ResponseHandler({});
    super({ entity, needsAuthorization, responseHandler });
  }

  async onSubmit(values: any, id?: string): Promise<any> {
    const RecuperacaoSenhaRequestBuilder = new RecuperacaoSenha({
      entity: this.entity,
      body: values,
      responseHandler: this.responseHandler,
    });
    return await RecuperacaoSenhaRequestBuilder.build();
  }
}
