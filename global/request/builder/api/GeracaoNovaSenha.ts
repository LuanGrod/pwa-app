import { GeracaoNovaSenha as ResponseHandler } from "@global/request/response/handler/api/GeracaoNovaSenha";
import { GeracaoNovaSenha as GeracaoNovaSenhaRequestBuilder } from "../GeracaoNovaSenha";
import { ResponseHandlerInterface } from "@global/request/response/handler/HandlerInterface";

type GeracaoNovaSenhaProps = {
  entity?: string | null;
  data: any;
  headers?: HeadersInit;
  responseHandler?: ResponseHandlerInterface | null;
};

export class GeracaoNovaSenha extends GeracaoNovaSenhaRequestBuilder {
  constructor({ entity, data, headers = {}, responseHandler = null }: GeracaoNovaSenhaProps) {
    responseHandler = responseHandler || new ResponseHandler({});

    super({ entity, data, responseHandler, headers });
  }
}
