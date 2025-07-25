import { ResponseHandlerInterface } from "@global/request/response/handler/HandlerInterface";
import SubmitHandlerInterface from "./SubmitHandlerInterface";
import { GeracaoNovaSenha } from "@global/request/builder/GeracaoNovaSenha";
import { GeracaoNovaSenha as ResponseHandler } from "@global/request/response/handler/GeracaoNovaSenha";

type GeracaoNovaSenhaHandlerProps = {
  entity: string;
  needsAuthorization?: boolean;
  responseHandler?: ResponseHandlerInterface | null;
};

export class GeracaoNovaSenhaHandler implements SubmitHandlerInterface {
  protected entity?: string | null;
  protected needsAuthorization: boolean;
  protected responseHandler: ResponseHandlerInterface;

  constructor({
    entity,
    needsAuthorization,
    responseHandler = null,
  }: GeracaoNovaSenhaHandlerProps) {
    this.entity = entity;
    this.needsAuthorization = needsAuthorization || false;
    this.responseHandler = responseHandler || new ResponseHandler({});
  }

  async onSubmit(values: any, id?: string): Promise<any> {
    const geracaoNovaSenhaRequestBuilder = new GeracaoNovaSenha({
      entity: this.entity,
      body: values,
      responseHandler: this.responseHandler,
    });
    return await geracaoNovaSenhaRequestBuilder.build();
  }
}
