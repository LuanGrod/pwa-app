import { Methods } from "@global/type/Methods";
import { RequestBuilder } from "./Builder";
import { Listing as ResponseHandler } from "@global/request/response/handler/Listing";
import { DefaultApi } from "../error/handler/collection/DefaultApi";

type ListingProps = {
  entity: string;
  parentEntity?: string | null;
  parentId?: number | null;
  params?: Record<string, any>;
  headers?: HeadersInit;
};

export class Listing extends RequestBuilder {
  constructor({
    entity,
    parentEntity = null,
    parentId = null,
    params = {},
    headers = {},
  }: ListingProps) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const endpoint = parentEntity
      ? `${apiUrl}/${parentEntity}/${parentId}/${entity}`
      : `${apiUrl}/${entity}`;

    const method: Methods = "GET";

    const responseHandler = new ResponseHandler({
      errorHandlerCollection: new DefaultApi(),
    });

    super({ endpoint, method, headers, data: null, responseHandler });

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
