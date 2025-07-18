import { Listing as ListingRequestBuilder } from "../Listing";
import { Listing as ResponseHandler } from "@global/request/response/handler/api/Listing";
import { ResponseHandlerInterface } from "@global/request/response/handler/HandlerInterface";

type ListingProps = {
  entity: string;
  parentEntity?: string | null;
  parentId?: number | null;
  params?: Record<string, any>;
  headers?: HeadersInit;
  responseHandler?: ResponseHandlerInterface | null;
};

export class Listing extends ListingRequestBuilder {
  constructor({
    entity,
    parentEntity = null,
    parentId = null,
    params = {},
    headers = {},
    responseHandler = null,
  }: ListingProps) {
    responseHandler = responseHandler || new ResponseHandler({});

    super({ entity, parentEntity, parentId, params, headers, responseHandler });
  }
}
