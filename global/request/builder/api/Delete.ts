import { Delete as DeleteRequestBuilder } from "../Delete";
import { Delete as ResponseHandler } from "@global/request/response/handler/api/Delete";
import { ResponseHandlerInterface } from "@global/request/response/handler/HandlerInterface";
import { CollectionInterface as HeaderHandlerCollection } from "@global/request/header/handler/collection/CollectionInterface";

type DeleteProps = {
  entity: string;
  id: string;
  headers?: HeaderHandlerCollection | null;
  responseHandler?: ResponseHandlerInterface | null;
};

export class Delete extends DeleteRequestBuilder {
  constructor({ entity, id, headers = null, responseHandler = null }: DeleteProps) {

    responseHandler = responseHandler || new ResponseHandler({});

    super({ entity, id, headers, responseHandler });
  }
}
