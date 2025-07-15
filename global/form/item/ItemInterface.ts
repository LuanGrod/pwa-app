import { FilterInterface } from "@global/filter/FilterInterface";
import { MaskInterface } from "@global/mask/MaskInterface";
import { ValidatorInterface } from "@global/validator/ValidatorInterface";
import { HTMLInputTypeAttribute } from "react";
import { Form } from "../Form";

export type MsgPlacement = "form" | "below";

export interface ItemInterface {
  getType(): HTMLInputTypeAttribute | "select" | "textarea";
  getName(): string | null;
  getEntity(): string | null;
  getFormName(): string | null;
  getTextName(): string | null;
  getTextNameGender(): boolean;
  getFilters(): FilterInterface[];
  getValidators(): ValidatorInterface[];
  getMask(): MaskInterface | null;
  getMsgPlacement(): MsgPlacement | null;
  getTags(): string[];
  getWidgetType(): any;
  getWidgetProps(form: Form, itemHook: any, data?: any): Object | null;
  getWidgetClassName(): string | null;
  getItemType(): any;
  getItemProps(form: Form, itemHook: any): Object | null;
  getItemClassName(): string | null;
  getDefaultValue(): any;
  getData(): Map<string, any>;
}
