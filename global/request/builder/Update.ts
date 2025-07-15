import { Methods } from "@global/type/Methods";
import { RequestBuilder } from "./Builder";
import { Update as ResponseHandler } from "@global/request/response/handler/Update";
import { DefaultApi } from "../error/handler/collection/DefaultApi";

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

    const responseHandler = new ResponseHandler({
      errorHandlerCollection: new DefaultApi(),
    });

    super({ endpoint, method, data, responseHandler, headers });
  }
}
