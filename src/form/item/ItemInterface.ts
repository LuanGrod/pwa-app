import { FilterInterface } from "@filter/FilterInterface";
import { MaskInterface } from "@mask/MaskInterface";
import { ValidatorInterface } from "@validator/ValidatorInterface";
import { HTMLInputTypeAttribute } from "react";

export type MsgPlacement = "form" | "below";

export interface ItemInterface {
  type: HTMLInputTypeAttribute;
  name: string;
  entity: string | null;
  fullName: string | null;
  formName: string | null;
  textName: string | null;
  textNameGender: boolean;
  filters: FilterInterface[];
  validators: ValidatorInterface[];
  mask: MaskInterface | null;
  msgPlacement: MsgPlacement | null;
  tags: string[];
  getType(): HTMLInputTypeAttribute;
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
}
