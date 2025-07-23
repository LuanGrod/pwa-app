import { FilterInterface } from "@global/filter/FilterInterface";
import { MsgPlacement } from "@global/form/item/ItemInterface";
import { MaskInterface } from "@global/mask/MaskInterface";
import { ValidatorInterface } from "@global/validator/ValidatorInterface";
import { ComponentType, HTMLInputTypeAttribute, ReactNode } from "react";

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
  widgetType?: ComponentType<any>;
  widgetClassName?: string | null;
  itemType?: ComponentType<any>;
  itemClassName?: string | null;
  defaultValue?: any;
  data?: Map<string, any>;
};
