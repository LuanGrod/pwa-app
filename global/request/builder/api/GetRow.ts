import { GetRow as GetRowRequestBuilder } from "../GetRow";
import { GetRow as ResponseHandler } from "@global/request/response/handler/api/GetRow";
import { GetRowBuilderProps } from "@global/type/request/builder/GetRow";

export class GetRow extends GetRowRequestBuilder {
  constructor(props: GetRowBuilderProps) {
    const responseHandler = props.responseHandler || new ResponseHandler({});
    super({ ...props, responseHandler });
  }
}
