import { Methods } from "@global/type/Methods";
import { RequestBuilder } from "./Builder";
import { Update as ResponseHandler } from "@global/request/response/handler/Update";
import { ResponseHandlerInterface } from "../response/handler/HandlerInterface";

type UpdateProps = {
  entity: string;
  data: any;
  id: string;
  headers?: HeadersInit;
  responseHandler?: ResponseHandlerInterface | null;
};

export class Update extends RequestBuilder {
  constructor({ entity, data, id, headers = {}, responseHandler = null }: UpdateProps) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    let endpoint = `${apiUrl}/edicao/${entity}`;

    if (id) {
      endpoint += `/${id}`;
    }

    const method: Methods = "POST";

    responseHandler = responseHandler || new ResponseHandler({});

    super({ endpoint, method, data, responseHandler, headers });
  }
}
