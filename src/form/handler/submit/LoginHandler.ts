import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import SubmitHandlerInterface from "./SubmitHandlerInterface";
import { Login } from "@request/builder/Login";

export class LoginHandler implements SubmitHandlerInterface {
  protected entity?: string | null;
  protected router: AppRouterInstance;
  public needsAuthorization: boolean;

  constructor({
    entity,
    router,
    needsAuthorization,
  }: {
    entity?: string | null;
    router: AppRouterInstance;
    needsAuthorization?: boolean;
  }) {
    this.entity = entity;
    this.router = router;

    this.needsAuthorization = needsAuthorization || false;
  }

  async onSubmit(values: any, id?: string): Promise<any> {
    const loginRequestBuilder = new Login({ entity: this.entity, data: values, router: this.router });
    return await loginRequestBuilder.build();
  }
}
