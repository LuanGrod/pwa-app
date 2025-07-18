import { RecuperacaoSenha as RecuperacaoSenhaRequestBuilder } from "../RecuperacaoSenha";
import { RecuperacaoSenha as ResponseHandler } from "@global/request/response/handler/api/RecuperacaoSenha";
import { ResponseHandlerInterface } from "@global/request/response/handler/HandlerInterface";

type RecuperacaoSenhaProps = {
  entity?: string | null;
  data: any;
  headers?: HeadersInit;
  responseHandler?: ResponseHandlerInterface | null;
};

export class RecuperacaoSenha extends RecuperacaoSenhaRequestBuilder {
  constructor({ entity, data, headers = {}, responseHandler = null }: RecuperacaoSenhaProps) {
    responseHandler = responseHandler || new ResponseHandler({});

    super({ entity, data, headers, responseHandler });
  }
}
