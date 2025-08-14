import { Methods } from "@global/type/Methods";
import { RequestBuilder } from "./Builder";
import { Listing as ResponseHandler } from "@global/request/response/handler/Listing";
import { ResponseHandlerInterface } from "../response/handler/HandlerInterface";
import { CollectionInterface as HeaderHandlerCollection } from "@global/request/header/handler/collection/CollectionInterface";

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

    const query = this.buildQuery(params);
    if (query) {
      this.endpoint += `?${query}`;
    }
  }

  buildQuery(params: Record<string, any>) {
    const esc = encodeURIComponent;
    return Object.entries(params)
      .map(([k, v]) => `${esc(k)}=${esc(v)}`)
      .join("&");
  }
}
