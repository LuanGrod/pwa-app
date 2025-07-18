import { Delete as DeleteRequestBuilder } from "../Delete";
import { Delete as ResponseHandler } from "@global/request/response/handler/api/Delete";
import { ResponseHandlerInterface } from "@global/request/response/handler/HandlerInterface";

type DeleteProps = {
  entity: string;
  id: string;
  headers?: HeadersInit;
  responseHandler?: ResponseHandlerInterface | null;
};

export class Delete extends DeleteRequestBuilder {
  constructor({ entity, id, headers = {}, responseHandler = null }: DeleteProps) {

    responseHandler = responseHandler || new ResponseHandler({});

    super({ entity, id, headers, responseHandler });
  }
}
