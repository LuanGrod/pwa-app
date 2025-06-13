import { FilterInterface } from "@/filter/FilterInterface";
import { MsgPlacement } from "@/form/item/ItemInterface";
import { MaskInterface } from "@/mask/MaskInterface";
import { ValidatorInterface } from "@/validator/ValidatorInterface";
import { HTMLInputTypeAttribute } from "react";

export type ItemDef = {
  name: string;
  type?: HTMLInputTypeAttribute;
  entity?: string | null;
  validators?: ValidatorInterface[];
  textNameGender?: boolean;
  fullName?: string | null;
  formName?: string | null;
  textName?: string | null;
  filters?: FilterInterface[];
  mask?: MaskInterface | null;
  msgPlacement?: MsgPlacement | null;
  tags?: string[];
};
