import { FilterInterface } from "@filter/FilterInterface";
import { MaskInterface } from "@mask/MaskInterface";
import { ValidatorInterface } from "@validator/ValidatorInterface";
import { HTMLInputTypeAttribute } from "react";
import { Form } from "../Form";

export type MsgPlacement = "form" | "below";

export interface ItemInterface {
  getType(): HTMLInputTypeAttribute | "select" | "textarea";
  getName(): string;
  getEntity(): string | null;
  getFullName(): string | null;
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
  getItemType(): any;
  getItemProps(form: Form, itemHook: any): Object | null;
  getDefaultValue(): any;
}
