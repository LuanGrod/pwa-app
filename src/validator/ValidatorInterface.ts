import { ItemInterface } from "@form/item/ItemInterface";

export interface ValidatorInterface {
  validate(value: any): boolean;
  getMsg(item: ItemInterface): string;
}
