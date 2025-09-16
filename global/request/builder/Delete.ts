import { Methods } from "@global/type/Methods";
import { RequestBuilder } from "./Builder";
import { Delete as ResponseHandler } from "@global/request/response/handler/Delete";
import { DeleteBuilderProps } from "@global/type/request/builder/Delete";
import { BUILDER_PATHS } from "@global/constants/request/builder/ApiPaths";

export class Delete extends RequestBuilder {
  constructor(props: DeleteBuilderProps) {
    const responseHandler = props.responseHandler || new ResponseHandler({});
    super({ ...props, responseHandler });
  }

  protected getApiPath(): string {
    return BUILDER_PATHS.Delete;
  }

  protected getMethod(): Methods {
    return "POST";
  }
}
