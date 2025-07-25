import { Methods } from "@global/type/Methods";
import { RequestBuilder } from "./Builder";
import { ResponseHandlerInterface } from "../response/handler/HandlerInterface";
import { GeracaoNovaSenha as ResponseHandler } from "@global/request/response/handler/GeracaoNovaSenha";
import { CollectionInterface as HeaderHandlerCollection } from "@global/request/header/handler/collection/CollectionInterface";

type GeracaoNovaSenhaProps = {
  entity?: string | null;
  body: any;
  headers?: HeaderHandlerCollection | null;
  responseHandler?: ResponseHandlerInterface | null;
};

export class GeracaoNovaSenha extends RequestBuilder {
  constructor({ entity, body, headers = null, responseHandler = null }: GeracaoNovaSenhaProps) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const endpoint = entity
      ? `${apiUrl}/geracao-nova-senha/${entity}`
      : `${apiUrl}/geracao-nova-senha`;
    const method: Methods = "POST";
    responseHandler = responseHandler || new ResponseHandler({});
    super({ endpoint, method, body, responseHandler, headers });
  }
}
