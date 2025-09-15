import { AbstractErrorHandler } from "./AbstractErrorHandler";

export class RedirectErrorHandler extends AbstractErrorHandler {
  private redirectUrl: string;

  constructor(
    { errorContent, msg }: { errorContent: string; msg: string },
    redirectUrl: string = "/sair"
  ) {
    super({ errorContent, msg });
    this.redirectUrl = redirectUrl;
  }

  protected processError(error: Error): string[] | null {
    window.location.href = this.redirectUrl;
    return null;
  }
}
