import { ResponseHandlerInterface } from "@global/request/response/handler/HandlerInterface";

export type FormHandlerProps = {
  entity?: string;
  needsAuthorization?: boolean;
  responseHandler?: ResponseHandlerInterface;
};
