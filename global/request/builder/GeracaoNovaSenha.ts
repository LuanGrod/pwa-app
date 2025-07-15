import { Methods } from "@global/type/Methods";
import { RequestBuilder } from "./Builder";
import { GeracaoNovaSenha as ResponseHandler } from "@global/request/response/handler/GeracaoNovaSenha";
import { DefaultApi } from "../error/handler/collection/DefaultApi";

type GeracaoNovaSenhaProps = {
  entity?: string | null;
  data: any;
  headers?: HeadersInit;
};

export class GeracaoNovaSenha extends RequestBuilder {
  constructor({ entity, data, headers = {} }: GeracaoNovaSenhaProps) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const endpoint = entity
      ? `${apiUrl}/geracao-nova-senha/${entity}`
      : `${apiUrl}/geracao-nova-senha`;

    const method: Methods = "POST";

    const responseHandler = new ResponseHandler({
      errorHandlerCollection: new DefaultApi(),
    });

    super({ endpoint, method, data, responseHandler, headers });
  }
}
