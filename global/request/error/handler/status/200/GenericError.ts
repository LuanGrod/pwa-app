import { GenericErrorHandler } from "@global/request/error/handler/GenericErrorHandler";

export class GenericError extends GenericErrorHandler {
  constructor() {
    super({ 
      errorContent: "HTTP error 200", 
      msg: "Erro desconhecido" 
    });
  }
}
