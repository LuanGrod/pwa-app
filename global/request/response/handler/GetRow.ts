import { Default as DefaultErrorHandlerCollection } from "@global/request/error/handler/collection/Default";
import { CollectionInterface as ErrorHandlerCollection } from "@global/request/error/handler/collection/CollectionInterface";
import { ResponseHandler } from "./Handler";

type GetRowProps = {
  errorHandlerCollection?: ErrorHandlerCollection | null;
};

export class GetRow extends ResponseHandler {
  constructor({ errorHandlerCollection = null }: GetRowProps) {
    super({
      errorHandlerCollection: errorHandlerCollection || new DefaultErrorHandlerCollection(),
    });
    this.onSuccessFn = this.handleSuccess.bind(this);
    this.onErrorFn = this.handleError.bind(this);
  }

  protected async handleSuccess(data: any): Promise<any> {
    return {
      success: true,
      data: data,
    };
  }
}
