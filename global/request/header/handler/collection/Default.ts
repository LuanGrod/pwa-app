import ContentType from "../ContentType";
import { Collection } from "./Collection";

/**
 * Provides the default header handlers for requests (currently only ContentType).
 */
export class Default extends Collection {
  constructor() {
    super({
      elements: [
        new ContentType(),
      ],
    });
  }
} 