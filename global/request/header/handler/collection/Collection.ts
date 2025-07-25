import { CollectionInterface } from "./CollectionInterface";
import { HeaderHandlerInterface } from "../HandlerInterface";

export class Collection implements CollectionInterface {
  protected elements: HeaderHandlerInterface[];

  constructor({ elements }: { elements: HeaderHandlerInterface[] }) {
    this.elements = elements;
  }

  get(): HeaderHandlerInterface[] {
    return this.elements;
  }
} 