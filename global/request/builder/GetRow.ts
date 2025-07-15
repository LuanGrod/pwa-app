import { Methods } from "@global/type/Methods";
import { RequestBuilder } from "./Builder";
import { GetRow as ResponseHandler } from "@global/request/response/handler/GetRow";

type GetRowProps = {
  entity: string;
  id: string | number;
  parentEntity?: string | null;
  parentId?: number | null;
  params?: Record<string, any>;
  headers?: HeadersInit;
};

export class GetRow extends RequestBuilder {
  constructor({ entity, id, parentEntity = null, parentId = null, params = {}, headers = {} }: GetRowProps) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const endpoint = parentEntity ? `${apiUrl}/${parentEntity}/${parentId}/${entity}/${id}` : `${apiUrl}/${entity}/${id}`;

    const method: Methods = "GET";

    const responseHandler = new ResponseHandler({});

    super({ endpoint, method, headers, data: null, responseHandler });
  }
}
