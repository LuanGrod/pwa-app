import { Update as UpdateResponseHandler } from "./Update";
import { UpdateProps } from "../Update";

export class RefreshOnSuccessUpdate extends UpdateResponseHandler {
  constructor(props: UpdateProps = {}) {
    super(props);
  }

  protected async handleSuccess(result: any): Promise<any> {
    // Call the base handler to get the default response
    const response = await super.handleSuccess(result);
    // Refresh the page on success
    if (typeof window !== "undefined") {
      window.location.reload();
    }
    return response;
  }
} 