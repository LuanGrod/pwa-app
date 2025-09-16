import { Methods } from "@global/type/Methods";
import { RequestBuilder } from "./Builder";
import { Post as ResponseHandler } from "@global/request/response/handler/Post";
import { PostBuilderProps } from "@global/type/request/builder/Post";
import { BUILDER_PATHS } from "@global/constants/request/builder/ApiPaths";

export class Post extends RequestBuilder {
  constructor(props: PostBuilderProps) {
    const responseHandler = props.responseHandler || new ResponseHandler({});
    super({ ...props, responseHandler });
  }

  protected getApiPath(): string {
    return BUILDER_PATHS.Post;
  }

  protected getMethod(): Methods {
    return "POST";
  }
}
