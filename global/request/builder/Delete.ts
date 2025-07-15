import { Methods } from "@global/type/Methods";
import { RequestBuilder } from "./Builder";
import { Delete as ResponseHandler } from "@global/request/response/handler/Delete";
import { DefaultApi } from "../error/handler/collection/DefaultApi";

type DeleteProps = {
  entity: string;
  id: string;
  headers?: HeadersInit;
};

export class Delete extends RequestBuilder {
  constructor({ entity, id, headers = {} }: DeleteProps) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const endpoint = `${apiUrl}/exclusao/${entity}/${id}`;

    const method: Methods = "POST";

    const responseHandler = new ResponseHandler({
      errorHandlerCollection: new DefaultApi(),
    });

    super({ endpoint, method, data: null, responseHandler, headers });
  }
}
