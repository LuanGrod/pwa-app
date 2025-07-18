import { ResponseHandlerInterface } from "@global/request/response/handler/HandlerInterface";
import { GeracaoNovaSenhaHandler as FormHandler } from "../GeracaoNovaSenhaHandler";
import { GeracaoNovaSenha } from "@global/request/builder/api/GeracaoNovaSenha";
import { GeracaoNovaSenha as ResponseHandler } from "@global/request/response/handler/api/GeracaoNovaSenha";

type GeracaoNovaSenhaHandlerProps = {
  entity: string;
  needsAuthorization?: boolean;
  responseHandler?: ResponseHandlerInterface | null;
};

export class GeracaoNovaSenhaHandler extends FormHandler {
  constructor({
    entity,
    needsAuthorization,
    responseHandler = null,
  }: GeracaoNovaSenhaHandlerProps) {
    responseHandler = responseHandler || new ResponseHandler({});
    super({ entity, needsAuthorization, responseHandler });
  }

  async onSubmit(values: any, id?: string): Promise<any> {
    const geracaoNovaSenhaRequestBuilder = new GeracaoNovaSenha({
      entity: this.entity,
      data: values,
      responseHandler: this.responseHandler,
    });
    return await geracaoNovaSenhaRequestBuilder.build();
  }
}
