import { ResponseHandlerInterface } from "@global/request/response/handler/HandlerInterface";
import SubmitHandlerInterface from "./SubmitHandlerInterface";
import { DefaultResponse } from "@global/type/request/response/handler/DefaultResponse";

export type BaseSubmitHandlerProps = {
  entity?: string;
  needsAuthorization?: boolean;
  responseHandler: ResponseHandlerInterface;
};

export type SubmitHandlerConstructorProps = {
  entity?: string;
  needsAuthorization?: boolean;
  responseHandler?: ResponseHandlerInterface | null;
};

export abstract class BaseSubmitHandler implements SubmitHandlerInterface {
  protected entity?: string;
  protected needsAuthorization: boolean;
  protected responseHandler: ResponseHandlerInterface;

  constructor({ entity, needsAuthorization, responseHandler }: BaseSubmitHandlerProps) {
    this.entity = entity;
    this.needsAuthorization = needsAuthorization || false;
    this.responseHandler = responseHandler;
  }

  protected abstract createRequestBuilder(props: any): any;

  async onSubmit<T>(values: { [key: string]: string }, id?: string): Promise<DefaultResponse<T>> {
    const builderProps = {
      entity: this.entity,
      body: values,
      responseHandler: this.responseHandler,
      ...(id && { id }),
    };

    const requestBuilder = this.createRequestBuilder(builderProps);

    return await requestBuilder.build(this.needsAuthorization);
  }
}
