export default interface SubmitHandlerInterface {
  onSubmit(values: { [key: string]: string }, id?: string): Promise<any>;
}
