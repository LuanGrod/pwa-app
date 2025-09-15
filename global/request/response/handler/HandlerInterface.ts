export interface ResponseHandlerInterface {
  onSuccess(result: any, onSuccessCallback?: (result: any) => Promise<void> | void): any;
  onError(error: Error): any;
}
