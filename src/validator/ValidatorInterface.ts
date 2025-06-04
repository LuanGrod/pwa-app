import { ItemInterface } from "@form/item/ItemInterface";

export interface ValidatorInterface {
  validate(value: string): boolean;
  getMsg(item: ItemInterface): string;
}
