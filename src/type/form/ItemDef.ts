import { FilterInterface } from "@/filter/FilterInterface";
import { MsgPlacement } from "@/form/item/ItemInterface";
import { MaskInterface } from "@/mask/MaskInterface";
import { ValidatorInterface } from "@/validator/ValidatorInterface";
import { HTMLInputTypeAttribute } from "react";

type tags = "multipleRows" | "example"

export type ItemDef = {
  fieldName: string;
  name?: string | null;
  type?: HTMLInputTypeAttribute | "textarea" | "select";
  entity?: string | null;
  validators?: ValidatorInterface[];
  textNameGender?: boolean;
  formName?: string | null;
  textName?: string | null;
  filters?: FilterInterface[];
  mask?: MaskInterface | null;
  msgPlacement?: MsgPlacement | null;
  tags?: tags[];
  widgetType: any;
  widgetClassName: string | null;
  itemType: any;
  itemClassName: string | null;
  defaultValue?: any;
  data: Map<string, any>;
};
