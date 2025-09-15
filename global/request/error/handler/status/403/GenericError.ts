import { GenericErrorHandler } from "@global/request/error/handler/GenericErrorHandler";

export class GenericError extends GenericErrorHandler {
  constructor() {
    super({ 
      errorContent: "HTTP error 403", 
      msg: "Acesso negado" 
    });
  }
}
