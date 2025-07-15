export interface HeaderHandlerInterface {
  // Properties
  

  // Methods
  /**
   * 
   * @param headers Cabeçalho da requisição
   * @param tokenName - Nome do cookie do token (quando se tem mais de um perfil de usuário)
   */
  handle(headers: HeadersInit, tokenName?: string): HeadersInit;
}