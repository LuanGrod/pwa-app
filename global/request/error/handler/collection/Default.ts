import { Error400 } from "../Error400";
import { Error401 } from "../Error401";
import { Error403 } from "../Error403";
import { Error404 } from "../Error404";
import { Error422 } from "../Error422";
import { Error500 } from "../Error500";
import { Fetch } from "../Fetch";
import { Collection } from "./Collection";


export class Default extends Collection {
    constructor() {
      super({
        elements: [
          new Error400(),
          new Error401(),
          new Error403(),
          new Error404(),
          new Error422(),
          new Error500(),
          new Fetch()
        ]
      });
    }
}
