import { ItemInterface } from "@global/form/item/ItemInterface";

export interface ValidatorInterface {
  validate(value: any): boolean;
  getMsg(item: ItemInterface): string;
}
