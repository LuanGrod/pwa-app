import { Methods } from "@global/type/Methods";
import { RequestBuilder } from "./Builder";
import { GetRow as ResponseHandler } from "@global/request/response/handler/GetRow";
import { ResponseHandlerInterface } from "../response/handler/HandlerInterface";
import { CollectionInterface as HeaderHandlerCollection } from "@global/request/header/handler/collection/CollectionInterface";
import ParamBuilder from "../helper/ParamBuilder";

export type GetRowProps = {
  entity: string;
  id?: string | number | null;
  parentEntity?: string | null;
  parentId?: number | null;
  params?: Record<string, any>;
  headers?: HeaderHandlerCollection | null;
  responseHandler?: ResponseHandlerInterface | null;
};

/**
 * Base request builder for fetching a single row entity.
 *
 * This class extends {@link RequestBuilder} to provide functionality for
 * retrieving a specific entity row, with support for both standalone entities
 * and nested entities within parent contexts. It constructs the appropriate
 * endpoint URL and configures the GET request with custom parameters and headers.
 *
 * The default error handler uses a collection that displays general messages for errors.
 *
 * @param entity - The name of the resource to fetch.
 * @param id - (Optional) The unique identifier of the row to retrieve.
 * @param parentEntity - (Optional) The parent entity name for nested resources.
 * @param parentId - (Optional) The parent entity's identifier for nested resources.
 * @param params - (Optional) Additional query parameters for the request.
 * @param headers - (Optional) Custom headers for the request.
 * @param responseHandler - (Optional) Custom response handler; defaults to {@link ResponseHandler}.
 */
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
