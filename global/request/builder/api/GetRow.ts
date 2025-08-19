import { GetRowProps, GetRow as GetRowRequestBuilder } from "../GetRow";
import { GetRow as ResponseHandler } from "@global/request/response/handler/api/GetRow";

/**
 * Request builder for fetching a single row entity from the API.
 *
 * This class extends the base {@link GetRowRequestBuilder} to provide
 * additional configuration for retrieving a specific entity row, optionally
 * within a parent entity context. It also allows customization of request
 * parameters, headers, and response handling.
 *
 * The default error handler uses a collection that uses the messages coming from the API.
 *
 * @param entity - The name of the resource to fetch.
 * @param id - The unique identifier of the row to retrieve.
 * @param parentEntity - (Optional) The parent entity name, if applicable.
 * @param parentId - (Optional) The parent entity's identifier.
 * @param params - (Optional) Additional query parameters for the request.
 * @param headers - (Optional) Custom headers for the request.
 * @param responseHandler - (Optional) Custom response handler; defaults to {@link ResponseHandler}.
 */
export class GetRow extends GetRowRequestBuilder {
  constructor({
    entity,
    id = null,
    parentEntity = null,
    parentId = null,
    params = {},
    headers = null,
    responseHandler = null,
  }: GetRowProps) {
    responseHandler = responseHandler || new ResponseHandler({});

    super({ entity, id, parentEntity, parentId, params, headers, responseHandler });
  }
}
