import { Insert as InsertRequestBuilder } from "../Insert";
import { Insert as ResponseHandler } from "@global/request/response/handler/api/Insert";
import { ResponseHandlerInterface } from "@global/request/response/handler/HandlerInterface";
import { CollectionInterface as HeaderHandlerCollection } from "@global/request/header/handler/collection/CollectionInterface";

type InsertProps = {
  entity: string;
  body: any;
  parentEntity?: string | null;
  parentId?: number | null;
  headers?: HeaderHandlerCollection | null;
  responseHandler?: ResponseHandlerInterface | null;
};
export class Insert extends InsertRequestBuilder {
  constructor({
    entity,
    body,
    parentEntity = null,
    parentId = null,
    headers = null,
    responseHandler = null,
  }: InsertProps) {
    responseHandler = responseHandler || new ResponseHandler({});

    super({ entity, body, parentEntity, parentId, headers, responseHandler });
  }
}
