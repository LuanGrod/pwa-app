import { Methods } from "@/type/Methods";
import { RequestBuilder } from "./Builder";
import { Update as ResponseHandler } from "@request/response/handler/Update";

type UpdateProps = {
  entity: string;
  data: any;
  id: string;
  headers?: HeadersInit;
};

export class Update extends RequestBuilder {
  constructor({ entity, data, id, headers = {} }: UpdateProps) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const endpoint = `${apiUrl}/${entity}/${id}`;

    const method: Methods = "PUT";

    const responseHandler = new ResponseHandler({});

    super({ endpoint, method, data, responseHandler, headers });
  }
}
