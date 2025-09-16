import { RequestBuilder } from "./Builder";
import { Insert as ResponseHandler } from "../response/handler/Insert";
import { Methods } from "@global/type/Methods";
import { InsertBuilderProps } from "@global/type/request/builder/Insert";
import { BUILDER_PATHS } from "./constants/ApiPaths";

export class Insert extends RequestBuilder {
  constructor(props: InsertBuilderProps) {
    const responseHandler = props.responseHandler || new ResponseHandler({});
    super({ ...props, responseHandler });
  }

  protected getApiPath(): string {
    return BUILDER_PATHS.Insert;
  }

  protected getMethod(): Methods {
    return "POST";
  }
}
