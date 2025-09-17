import { DefaultResponse } from "@global/type/request/response/handler/DefaultResponse";

export default interface SubmitHandlerInterface {
  onSubmit<T>(values: { [key: string]: string }, id?: string): Promise<DefaultResponse<T>>;
}
