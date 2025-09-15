import { GenericError as Error400Generic } from "@global/request/error/handler/status/400/GenericError";
import { GenericError as Error401Generic } from "@global/request/error/handler/status/401/GenericError";
import { GenericError as Error403Generic } from "@global/request/error/handler/status/403/GenericError";
import { GenericError as Error404Generic } from "@global/request/error/handler/status/404/GenericError";
import { GenericError as Error422Generic } from "@global/request/error/handler/status/422/GenericError";
import { GenericError as Error500Generic } from "@global/request/error/handler/status/500/GenericError";
import { GenericError as FetchGeneric } from "@global/request/error/handler/status/fetch/GenericError";
import { Collection } from "./Collection";

/**
 * Mostra as mensagens de erro padrão da classe
 */
export class Default extends Collection {
  constructor() {
    super({
      elements: [
        new Error400Generic(),
        new Error401Generic(),
        new Error403Generic(),
        new Error404Generic(),
        new Error422Generic(),
        new Error500Generic(),
        new FetchGeneric(),
      ],
    });
  }
}
