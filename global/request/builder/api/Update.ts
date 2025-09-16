import { Update as UpdateRequestBuilder } from "../Update";
import { Update as ResponseHandler } from "@global/request/response/handler/api/Update";
import { UpdateBuilderProps } from "@global/type/request/builder/Update";

export class Update extends UpdateRequestBuilder {
  constructor(props: UpdateBuilderProps) {
    const responseHandler = props.responseHandler || new ResponseHandler({});
    super({ ...props, responseHandler });
  }
}
