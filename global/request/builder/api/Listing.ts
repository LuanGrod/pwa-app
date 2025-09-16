import { Listing as ListingRequestBuilder } from "../Listing";
import { Listing as ResponseHandler } from "@global/request/response/handler/api/Listing";
import { ListingBuilderProps } from "@global/type/request/builder/Listing";

export class Listing extends ListingRequestBuilder {
  constructor(props: ListingBuilderProps) {
    const responseHandler = props.responseHandler || new ResponseHandler({});
    super({ ...props, responseHandler });
  }
}
