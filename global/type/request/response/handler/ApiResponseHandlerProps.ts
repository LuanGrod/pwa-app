import { ResponseHandlerProps } from "./ResponseHandlerProps";

export type ApiResponseHandlerProps<T = any> = Omit<ResponseHandlerProps<T>, "errorHandlerCollection">;
