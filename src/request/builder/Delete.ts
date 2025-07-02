import { Methods } from "@/type/Methods";
import { RequestBuilder } from "./Builder";
import { Delete as ResponseHandler } from "@request/response/handler/Delete";

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

    const responseHandler = new ResponseHandler({});

    super({ endpoint, method, data: null, responseHandler, headers });
  }
}
