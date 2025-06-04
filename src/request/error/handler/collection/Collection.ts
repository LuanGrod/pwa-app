import { CollectionInterface } from "./CollectionInterface";
import { HandlerInterface as ErrorHandler } from "../HandlerInterface";

export class Collection implements CollectionInterface {
  protected elements: ErrorHandler[];

  constructor({ elements }: { elements: ErrorHandler[] }) {
    this.elements = elements;
  }

  get(): ErrorHandler[] {
    return this.elements;
  }
}
