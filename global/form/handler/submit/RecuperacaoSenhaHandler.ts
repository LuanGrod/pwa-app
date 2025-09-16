import { ResponseHandlerInterface } from "@global/request/response/handler/HandlerInterface";
import SubmitHandlerInterface from "./SubmitHandlerInterface";
import { RecuperacaoSenha } from "@global/request/builder/RecuperacaoSenha";
import { RecuperacaoSenha as ResponseHandler } from "@global/request/response/handler/RecuperacaoSenha";

type RecuperacaoSenhaHandlerProps = {
  entity?: string;
  needsAuthorization?: boolean;
  responseHandler?: ResponseHandlerInterface | null;
};

export class RecuperacaoSenhaHandler implements SubmitHandlerInterface {
  protected entity?: string;
  protected needsAuthorization: boolean;
  protected responseHandler: ResponseHandlerInterface;

  constructor({
    entity,
    needsAuthorization,
    responseHandler = null,
  }: RecuperacaoSenhaHandlerProps) {
    this.entity = entity;
    this.needsAuthorization = needsAuthorization || false;
    this.responseHandler = responseHandler || new ResponseHandler({});
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
