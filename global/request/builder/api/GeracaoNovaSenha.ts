import { GeracaoNovaSenha as ResponseHandler } from "@global/request/response/handler/api/GeracaoNovaSenha";
import { GeracaoNovaSenha as GeracaoNovaSenhaRequestBuilder } from "../GeracaoNovaSenha";
import { ResponseHandlerInterface } from "@global/request/response/handler/HandlerInterface";
import { CollectionInterface as HeaderHandlerCollection } from "@global/request/header/handler/collection/CollectionInterface";

type GeracaoNovaSenhaProps = {
  entity?: string | null;
  body: any;
  headers?: HeaderHandlerCollection | null;
  responseHandler?: ResponseHandlerInterface | null;
};

export class GeracaoNovaSenha extends GeracaoNovaSenhaRequestBuilder {
  constructor({ entity, body, headers = null, responseHandler = null }: GeracaoNovaSenhaProps) {
    responseHandler = responseHandler || new ResponseHandler({});

    super({ entity, body, headers, responseHandler });
  }
}
