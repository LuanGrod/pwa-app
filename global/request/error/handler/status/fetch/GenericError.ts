import { GenericErrorHandler } from "@global/request/error/handler/GenericErrorHandler";

export class GenericError extends GenericErrorHandler {
  constructor() {
    super({ 
      errorContent: "Failed to fetch", 
      msg: "Erro de conexão - verifique sua internet" 
    });
  }
}
