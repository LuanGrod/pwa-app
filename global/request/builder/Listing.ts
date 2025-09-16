import { Methods } from "@global/type/Methods";
import { RequestBuilder } from "./Builder";
import { Listing as ResponseHandler } from "@global/request/response/handler/Listing";
import { ListingBuilderProps } from "@global/type/request/builder/Listing";
import { BUILDER_PATHS } from "./constants/ApiPaths";
import ParamBuilder from "../helper/ParamBuilder";

export class Listing extends RequestBuilder {
  constructor(props: ListingBuilderProps) {
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
    return BUILDER_PATHS.Listing;
  }

  protected getMethod(): Methods {
    return "GET";
  }
}
