import { Methods } from "@global/type/Methods";
import { RequestBuilder } from "./Builder";
import { Update as ResponseHandler } from "@global/request/response/handler/Update";
import { ResponseHandlerInterface } from "../response/handler/HandlerInterface";
import { CollectionInterface as HeaderHandlerCollection } from "@global/request/header/handler/collection/CollectionInterface";

type UpdateProps = {
  entity: string;
  body: any;
  id?: string | null;
  headers?: HeaderHandlerCollection | null;
  responseHandler?: ResponseHandlerInterface | null;
};

export class Update extends RequestBuilder {
  constructor({ entity, body, id = null, headers = null, responseHandler = null }: UpdateProps) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    let endpoint = `${apiUrl}/edicao/${entity}`;
    if (id) {
      endpoint += `/${id}`;
    }
    const method: Methods = "POST";
    responseHandler = responseHandler || new ResponseHandler({});
    super({ endpoint, method, headers, body, responseHandler });
  }
}
