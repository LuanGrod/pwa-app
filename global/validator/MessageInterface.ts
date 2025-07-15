import { ItemInterface } from "@global/form/item/ItemInterface";

export interface MessageInterface {
  getMsg(item: ItemInterface): string;
}
