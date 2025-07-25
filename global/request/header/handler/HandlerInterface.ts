export interface HeaderHandlerInterface {
  // Methods
  /**
   * Handles and returns updated headers. The second parameter is optional and can be used for handler-specific options (e.g., token name, content type value).
   * @param headers Request headers
   */
  handle(headers: HeadersInit): HeadersInit;
}