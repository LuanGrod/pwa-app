import { HandlerInterface as ErrorHandler } from "../HandlerInterface";

export interface CollectionInterface {
  get(): ErrorHandler[];
}
