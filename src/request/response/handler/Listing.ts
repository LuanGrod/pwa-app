import { Default as DefaultErrorHandlerCollection } from "../../error/handler/collection/Default";
import { CollectionInterface as ErrorHandlerCollection } from "../../error/handler/collection/CollectionInterface";
import { ResponseHandler } from "./Handler";

export class Listing extends ResponseHandler {
  protected errorHandlerCollection: ErrorHandlerCollection;

  constructor({ errorHandlerCollection = null }: { errorHandlerCollection?: ErrorHandlerCollection | null }) {
    super({});
    this.errorHandlerCollection = errorHandlerCollection || new DefaultErrorHandlerCollection();
    this.onSuccessFn = this.handleSuccess.bind(this);
    this.onErrorFn = this.handleError.bind(this);
  }

  private async handleSuccess(data: any): Promise<any> {
    return {
      success: true,
      data: data,
    };
  }
}
