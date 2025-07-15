import { Error400 } from "../Error400";
import { Error401b } from "../Error401b";
import { Error403 } from "../Error403";
import { Error404 } from "../Error404";
import { Error422b } from "../Error422b";
import { Error500 } from "../Error500";
import { Fetch } from "../Fetch";
import { Collection } from "./Collection";


export class DefaultApi extends Collection {
    constructor() {
      super({
        elements: [
          new Error400(),
          new Error401b(),
          new Error403(),
          new Error404(),
          new Error422b(),
          new Error500(),
          new Fetch()
        ]
      });
    }
}
