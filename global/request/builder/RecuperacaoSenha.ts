import { Methods } from "@global/type/Methods";
import { RequestBuilder } from "./Builder";
import { RecuperacaoSenha as ResponseHandler } from "@global/request/response/handler/RecuperacaoSenha";
import { ResponseHandlerInterface } from "../response/handler/HandlerInterface";

type RecuperacaoSenhaProps = {
  entity?: string | null;
  data: any;
  headers?: HeadersInit;
  responseHandler?: ResponseHandlerInterface | null;
};

export class RecuperacaoSenha extends RequestBuilder {
  constructor({ entity, data, headers = {}, responseHandler = null }: RecuperacaoSenhaProps) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const endpoint = entity
      ? `${apiUrl}/recuperacao-senha/${entity}`
      : `${apiUrl}/recuperacao-senha`;

    const method: Methods = "POST";

    responseHandler = responseHandler || new ResponseHandler({});

    super({ endpoint, method, data, responseHandler, headers });
  }
}
