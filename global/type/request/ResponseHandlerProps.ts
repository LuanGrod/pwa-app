import { CollectionInterface as ErrorHandlerCollection } from "@global/request/error/handler/collection/CollectionInterface";
import { ActionInterface } from "@global/request/response/handler/action/ActionInterface";

export type ResponseHandlerProps<T = any> = {
  successMessage?: string;
  errorHandlerCollection?: ErrorHandlerCollection;
  onSuccessCallback?: (result: T) => Promise<void> | void;
  onSuccessActions?: ActionInterface[];
};
