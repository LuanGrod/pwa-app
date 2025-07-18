export default interface SubmitHandlerInterface {
  onSubmit(values: any, id?: string): Promise<any>;
}
