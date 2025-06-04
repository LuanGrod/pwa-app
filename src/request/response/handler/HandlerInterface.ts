export interface ResponseHandlerInterface {
  onSuccess(result: any): any;
  onError(error: Error): any;
}
