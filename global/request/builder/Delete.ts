import { Methods } from "@global/type/Methods";
import { RequestBuilder } from "./Builder";
import { Delete as ResponseHandler } from "@global/request/response/handler/Delete";
import { ResponseHandlerInterface } from "../response/handler/HandlerInterface";

type DeleteProps = {
  entity: string;
  id: string;
  headers?: HeadersInit;
  responseHandler?: ResponseHandlerInterface | null;
};

export class Delete extends RequestBuilder {
  constructor({ entity, id, headers = {}, responseHandler = null }: DeleteProps) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const endpoint = `${apiUrl}/exclusao/${entity}/${id}`;

    const method: Methods = "POST";

    responseHandler = responseHandler || new ResponseHandler({});

    super({ endpoint, method, data: null, responseHandler, headers });
  }
}
