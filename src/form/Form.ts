import { FormInterface } from "./FormInterface";
import { ItemInterface } from "./item/ItemInterface";
import { MsgPlacement } from "./item/ItemInterface";

export class Form implements FormInterface {

  public items: ItemInterface[];
  public defaultMsgPlacement: MsgPlacement;

  constructor(items: ItemInterface[], defaultMsgPlacement: MsgPlacement) {
    this.items = items;
    this.defaultMsgPlacement = defaultMsgPlacement;
  }

  getItems(): ItemInterface[] {
    return this.items;
  }

}
