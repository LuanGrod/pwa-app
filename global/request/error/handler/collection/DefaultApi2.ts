import { Error400 } from "../Error400";
import { Error401c } from "../Error401c";
import { Error403 } from "../Error403";
import { Error404 } from "../Error404";
import { Error422b } from "../Error422b";
import { Error500 } from "../Error500";
import { Fetch } from "../Fetch";
import { Collection } from "./Collection";

/**
 * Mostra as mensagens de erro vindo da api
 * Usado para a tela de login
 * 401 -> /sair
 * login - 401 -> mostra mensagem de erro
 */
export class DefaultApi2 extends Collection {
  constructor() {
    super({
      elements: [
        new Error400(),
        new Error401c(),
        new Error403(),
        new Error404(),
        new Error422b(),
        new Error500(),
        new Fetch(),
      ],
    });
  }
}
