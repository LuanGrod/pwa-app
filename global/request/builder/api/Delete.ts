import { Delete as DeleteRequestBuilder } from "../Delete";
import { Delete as ResponseHandler } from "@global/request/response/handler/api/Delete";
import { DeleteBuilderProps } from "@global/type/request/builder/Delete";

export class Delete extends DeleteRequestBuilder {
  constructor(props: DeleteBuilderProps) {
    const responseHandler = props.responseHandler || new ResponseHandler({});
    super({ ...props, responseHandler });
  }
}
