import { RequestBuilder } from "./Builder";
import { Insert as ResponseHandler } from "../response/handler/Insert";
import { Methods } from "@global/type/Methods";
import { ResponseHandlerInterface } from "../response/handler/HandlerInterface";
import { CollectionInterface as HeaderHandlerCollection } from "@global/request/header/handler/collection/CollectionInterface";

type InsertProps = {
  entity: string;
  body: any;
  parentEntity?: string | null;
  parentId?: number | null;
  headers?: HeaderHandlerCollection | null;
  responseHandler?: ResponseHandlerInterface | null;
};

export class Insert extends RequestBuilder {
  constructor({
    entity,
    body,
    parentEntity = null,
    parentId = null,
    headers = null,
    responseHandler = null,
  }: InsertProps) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const endpoint = parentEntity
      ? `${apiUrl}/cadastro/${parentEntity}/${parentId}/${entity}`
      : `${apiUrl}/cadastro/${entity}`;
    const method: Methods = "POST";
    responseHandler = responseHandler || new ResponseHandler({});
    super({ endpoint, method, headers, body, responseHandler });
  }
}
