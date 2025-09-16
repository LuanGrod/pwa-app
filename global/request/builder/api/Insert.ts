import { Insert as InsertRequestBuilder } from "../Insert";
import { Insert as ResponseHandler } from "@global/request/response/handler/api/Insert";
import { InsertBuilderProps } from "@global/type/request/builder/Insert";

export class Insert extends InsertRequestBuilder {
  constructor(props: InsertBuilderProps) {
    const responseHandler = props.responseHandler || new ResponseHandler({});
    super({ ...props, responseHandler });
  }
}
