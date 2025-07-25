import { RecuperacaoSenha as RecuperacaoSenhaRequestBuilder } from "../RecuperacaoSenha";
import { RecuperacaoSenha as ResponseHandler } from "@global/request/response/handler/api/RecuperacaoSenha";
import { ResponseHandlerInterface } from "@global/request/response/handler/HandlerInterface";
import { CollectionInterface as HeaderHandlerCollection } from "@global/request/header/handler/collection/CollectionInterface";

type RecuperacaoSenhaProps = {
  entity?: string | null;
  body: any;
  headers?: HeaderHandlerCollection | null;
  responseHandler?: ResponseHandlerInterface | null;
};

export class RecuperacaoSenha extends RecuperacaoSenhaRequestBuilder {
  constructor({ entity, body, headers = null, responseHandler = null }: RecuperacaoSenhaProps) {
    responseHandler = responseHandler || new ResponseHandler({});

    super({ entity, body, headers, responseHandler });
  }
}
