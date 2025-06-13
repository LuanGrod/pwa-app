import { StripTagsFilter } from "@/filter/StripTagsFilter";
import { ItemDef } from "@/type/form/ItemDef";
import { FilterInterface } from "@filter/FilterInterface";
import { TrimFilter } from "@filter/TrimFilter";
import { MaskInterface } from "@mask/MaskInterface";
import { ValidatorInterface } from "@validator/ValidatorInterface";
import { HTMLInputTypeAttribute } from "react";
import { ItemInterface, MsgPlacement } from "./ItemInterface";

export class Item implements ItemInterface {
  public name: string;
  public type: HTMLInputTypeAttribute;
  public entity: string | null;
  public fullName: string | null;
  public formName: string | null;
  public textName: string | null;
  public textNameGender: boolean;
  public filters: FilterInterface[];
  public validators: ValidatorInterface[];
  public mask: MaskInterface | null;
  public msgPlacement: MsgPlacement | null;
  public tags: string[];

  constructor({
    name,
    type = "text",
    entity = null,
    validators = [],
    textNameGender = true,
    fullName = null,
    formName = null,
    textName = null,
    filters = [],
    mask = null,
    msgPlacement = null,
    tags = [],
  }: ItemDef) {
    this.name = `${entity}_${name}`;
    this.type = type;
    this.entity = entity;
    this.fullName = null;
    this.setDefaultFullName(fullName);
    this.formName = formName || name.charAt(0).toUpperCase() + name.slice(1);
    this.textName = textName || name;
    this.textNameGender = textNameGender;
    this.filters = filters.length > 0 ? filters : [new TrimFilter(), new StripTagsFilter()];
    this.validators = validators;
    this.mask = mask;
    this.msgPlacement = msgPlacement;
    this.tags = tags;
  }

  setDefaultFullName(fullName: string | null) {
    if (fullName) {
      this.fullName = fullName;
    } else if (this.entity) {
      this.fullName = `${this.entity}_${this.name}`;
    } else {
      this.fullName = this.name;
    }
  }

  getName(): string {
    return this.name;
  }

  getType(): HTMLInputTypeAttribute {
    return this.type;
  }

  getEntity(): string | null {
    return this.entity;
  }

  getFullName(): string | null {
    return this.fullName;
  }

  getFormName(): string | null {
    return this.formName;
  }

  getTextName(): string | null {
    return this.textName;
  }

  getTextNameGender(): boolean {
    return this.textNameGender;
  }

  getFilters(): FilterInterface[] {
    return this.filters;
  }

  getValidators(): ValidatorInterface[] {
    return this.validators;
  }

  getMask(): MaskInterface | null {
    return this.mask;
  }

  getMsgPlacement(): MsgPlacement | null {
    return this.msgPlacement;
  }

  getTags(): string[] {
    return this.tags;
  }
}
