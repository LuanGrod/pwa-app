import { ResponseHandlerInterface } from "@global/request/response/handler/HandlerInterface";
import { CollectionInterface as HeaderHandlerCollection } from "@global/request/header/handler/collection/CollectionInterface";

export type RequestBuilderProps = {
  entity: string;
  headers?: HeaderHandlerCollection;
  responseHandler?: ResponseHandlerInterface;
};