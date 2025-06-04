import { ItemInterface } from "@form/item/ItemInterface";

export interface MessageInterface {
  getMsg(item: ItemInterface): string;
}
