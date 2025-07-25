import { Methods } from "@global/type/Methods";
import { RequestBuilder } from "./Builder";
import { GetRow as ResponseHandler } from "@global/request/response/handler/GetRow";
import { ResponseHandlerInterface } from "../response/handler/HandlerInterface";
import { CollectionInterface as HeaderHandlerCollection } from "@global/request/header/handler/collection/CollectionInterface";

type GetRowProps = {
  entity: string;
  id: string | number;
  parentEntity?: string | null;
  parentId?: number | null;
  params?: Record<string, any>;
  headers?: HeaderHandlerCollection | null;
  responseHandler?: ResponseHandlerInterface | null;
};

export class GetRow extends RequestBuilder {
  constructor({
    entity,
    id,
    parentEntity = null,
    parentId = null,
    params = {},
    headers = null,
    responseHandler = null,
  }: GetRowProps) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const endpoint = parentEntity
      ? `${apiUrl}/${parentEntity}/${parentId}/${entity}/${id}`
      : `${apiUrl}/${entity}/${id}`;
    const method: Methods = "GET";
    responseHandler = responseHandler || new ResponseHandler({});
    super({ endpoint, method, headers, body: null, responseHandler });
  }
}
