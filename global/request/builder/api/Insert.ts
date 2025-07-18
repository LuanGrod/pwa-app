import { Insert as InsertRequestBuilder } from "../Insert";
import { Insert as ResponseHandler } from "@global/request/response/handler/api/Insert";
import { ResponseHandlerInterface } from "@global/request/response/handler/HandlerInterface";

type InsertProps = {
  entity: string;
  data: any;
  parentEntity?: string | null;
  parentId?: number | null;
  headers?: HeadersInit;
  responseHandler?: ResponseHandlerInterface | null;
};
export class Insert extends InsertRequestBuilder {
  constructor({
    entity,
    data,
    parentEntity = null,
    parentId = null,
    headers = {},
    responseHandler = null,
  }: InsertProps) {
    responseHandler = responseHandler || new ResponseHandler({});

    super({ entity, data, parentEntity, parentId, headers, responseHandler });
  }
}
