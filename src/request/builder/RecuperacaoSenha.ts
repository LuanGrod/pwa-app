import { Methods } from "@/type/Methods";
import { RequestBuilder } from "./Builder";
import { RecuperacaoSenha as ResponseHandler } from "@request/response/handler/RecuperacaoSenha";
import { DefaultApi } from "../error/handler/collection/DefaultApi";

type RecuperacaoSenhaProps = {
  entity?: string | null;
  data: any;
};

export class RecuperacaoSenha extends RequestBuilder {
  constructor({ entity, data }: RecuperacaoSenhaProps) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const endpoint = entity ? `${apiUrl}/recuperacao-senha/${entity}` : `${apiUrl}/recuperacao-senha`;

    const method: Methods = "POST";

    const responseHandler = new ResponseHandler({ errorHandlerCollection: new DefaultApi() });

    super({ endpoint, method, data, responseHandler });
  }
}
