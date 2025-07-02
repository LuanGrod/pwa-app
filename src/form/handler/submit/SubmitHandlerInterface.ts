export default interface SubmitHandlerInterface {
  needsAuthorization: boolean;
  onSubmit(values: any, id?: string): Promise<any>;
}
