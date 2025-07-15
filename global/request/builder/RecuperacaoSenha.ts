import { Methods } from "@global/type/Methods";
import { RequestBuilder } from "./Builder";
import { RecuperacaoSenha as ResponseHandler } from "@global/request/response/handler/RecuperacaoSenha";
import { DefaultApi } from "../error/handler/collection/DefaultApi";

type RecuperacaoSenhaProps = {
  entity?: string | null;
  data: any;
  headers?: HeadersInit;
};

export class RecuperacaoSenha extends RequestBuilder {
  constructor({ entity, data, headers = {} }: RecuperacaoSenhaProps) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const endpoint = entity ? `${apiUrl}/recuperacao-senha/${entity}` : `${apiUrl}/recuperacao-senha`;

    const method: Methods = "POST";

    const responseHandler = new ResponseHandler({ errorHandlerCollection: new DefaultApi() });

    super({ endpoint, method, data, responseHandler, headers });
  }
}
