import { Methods } from "@global/type/Methods";
import { RequestBuilder } from "./Builder";
import { GetRow as ResponseHandler } from "@global/request/response/handler/GetRow";
import { GetRowBuilderProps } from "@global/type/request/builder/GetRow";
import { BUILDER_PATHS } from "./constants/ApiPaths";
import ParamBuilder from "../helper/ParamBuilder";

export class GetRow extends RequestBuilder {
  constructor(props: GetRowBuilderProps) {
    const responseHandler = props.responseHandler || new ResponseHandler({});
    super({ ...props, responseHandler });

    if (props.params) {
      const paramBuilder = new ParamBuilder();
      const query = paramBuilder.build(props.params);
      if (query) {
        this.endpoint += `?${query}`;
      }
    }
  }

  protected getApiPath(): string {
    return BUILDER_PATHS.GetRow;
  }

  protected getMethod(): Methods {
    return "GET";
  }
}
