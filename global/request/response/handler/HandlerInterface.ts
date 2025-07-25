export interface ResponseHandlerInterface {
  /**
   * Handles a successful response. Optionally accepts a callback to be executed before returning.
   */
  onSuccess(result: any, onSuccessCallback?: (result: any) => Promise<void> | void): any;
  onError(error: Error): any;
}
