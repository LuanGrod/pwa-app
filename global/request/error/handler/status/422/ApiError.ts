import { ApiErrorHandler } from "@global/request/error/handler/ApiErrorHandler";

export class ApiError extends ApiErrorHandler {
  constructor() {
    super({ 
      errorContent: "HTTP error 422", 
      msg: "Campos inválidos" 
    });
  }
}
