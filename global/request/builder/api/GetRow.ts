import { GetRow as GetRowRequestBuilder } from "../GetRow";
import { GetRow as ResponseHandler } from "@global/request/response/handler/api/GetRow";
import { ResponseHandlerInterface } from "@global/request/response/handler/HandlerInterface";
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

export class GetRow extends GetRowRequestBuilder {
  constructor({
    entity,
    id,
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
