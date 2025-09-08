import { Methods } from "@global/type/Methods";
import { RequestBuilder } from "./Builder";
import { Listing as ResponseHandler } from "@global/request/response/handler/Listing";
import { ResponseHandlerInterface } from "../response/handler/HandlerInterface";
import { CollectionInterface as HeaderHandlerCollection } from "@global/request/header/handler/collection/CollectionInterface";
import ParamBuilder from "../helper/ParamBuilder";

type ListingProps = {
  entity: string;
  id?: string | null;
  parentEntity?: string | null;
  parentId?: number | null;
  params?: Record<string, any>;
  headers?: HeaderHandlerCollection | null;
  responseHandler?: ResponseHandlerInterface | null;
};

export class Listing extends RequestBuilder {
  constructor({
    entity,
    id = null,
    parentEntity = null,
    parentId = null,
    params = {},
    headers = null,
    responseHandler = null,
  }: ListingProps) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const endpoint = parentEntity
      ? `${apiUrl}/${parentEntity}/${parentId}/${entity}${id ? `/${id}` : ""}`
      : `${apiUrl}/${entity}${id ? `/${id}` : ""}`;

    const method: Methods = "GET";

    responseHandler = responseHandler || new ResponseHandler({});

    super({ endpoint, method, headers, body: null, responseHandler });

    const paramBuilder = new ParamBuilder();
    const query = paramBuilder.build(params);
    if (query) {
      this.endpoint += `?${query}`;
    }
  }
}
