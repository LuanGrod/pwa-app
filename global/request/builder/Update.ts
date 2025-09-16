import { Methods } from "@global/type/Methods";
import { RequestBuilder } from "./Builder";
import { Update as ResponseHandler } from "@global/request/response/handler/Update";
import { UpdateBuilderProps } from "@global/type/request/builder/Update";
import { BUILDER_PATHS } from "./constants/ApiPaths";

export class Update extends RequestBuilder {
  constructor(props: UpdateBuilderProps) {
    const responseHandler = props.responseHandler || new ResponseHandler({});
    super({ ...props, responseHandler });
  }

  protected getApiPath(): string {
    return BUILDER_PATHS.Update;
  }

  protected getMethod(): Methods {
    return "POST";
  }
}
