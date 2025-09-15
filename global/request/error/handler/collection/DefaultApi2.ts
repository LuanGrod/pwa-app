import { ApiError as Error200Api } from "../status/200/ApiError";
import { GenericError as Error400Generic } from "../status/400/GenericError";
import { ApiError as Error401Api } from "../status/401/ApiError";
import { GenericError as Error403Generic } from "../status/403/GenericError";
import { GenericError as Error404Generic } from "../status/404/GenericError";
import { ApiError as Error422Api } from "../status/422/ApiError";
import { GenericError as Error500Generic } from "../status/500/GenericError";
import { GenericError as FetchGeneric } from "../status/fetch/GenericError";
import { Collection } from "./Collection";

/**
 * Mostra as mensagens de erro vindo da api (quando não tem usa o genérico)
 */
export class DefaultApi2 extends Collection {
  constructor() {
    super({
      elements: [
        new Error200Api(),
        new Error400Generic(),
        new Error401Api(),
        new Error403Generic(),
        new Error404Generic(),
        new Error422Api(),
        new Error500Generic(),
        new FetchGeneric(),
      ],
    });
  }
}
