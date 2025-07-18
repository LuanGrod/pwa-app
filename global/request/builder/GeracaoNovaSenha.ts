import { Methods } from "@global/type/Methods";
import { RequestBuilder } from "./Builder";
import { ResponseHandlerInterface } from "../response/handler/HandlerInterface";
import { GeracaoNovaSenha as ResponseHandler } from "@global/request/response/handler/GeracaoNovaSenha";

type GeracaoNovaSenhaProps = {
  entity?: string | null;
  data: any;
  headers?: HeadersInit;
  responseHandler?: ResponseHandlerInterface | null;
};

export class GeracaoNovaSenha extends RequestBuilder {
  constructor({ entity, data, headers = {}, responseHandler = null }: GeracaoNovaSenhaProps) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const endpoint = entity
      ? `${apiUrl}/geracao-nova-senha/${entity}`
      : `${apiUrl}/geracao-nova-senha`;

    const method: Methods = "POST";

    responseHandler = responseHandler || new ResponseHandler({});

    super({ endpoint, method, data, responseHandler, headers });
  }
}
