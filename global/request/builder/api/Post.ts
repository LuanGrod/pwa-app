import { Post as PostRequestBuilder } from "../Post";
import { Post as ResponseHandler } from "@global/request/response/handler/api/Post";
import { PostBuilderProps } from "@global/type/request/builder/Post";

export class Post extends PostRequestBuilder {
  constructor(props: PostBuilderProps) {
    const responseHandler = props.responseHandler || new ResponseHandler({});
    super({ ...props, responseHandler });
  }
}
