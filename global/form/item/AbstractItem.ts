import { StripTagsFilter } from "@global/filter/StripTagsFilter";
import { ItemDef } from "@global/type/form/ItemDef";
import { FilterInterface } from "@global/filter/FilterInterface";
import { TrimFilter } from "@global/filter/TrimFilter";
import { MaskInterface } from "@global/mask/MaskInterface";
import { ValidatorInterface } from "@global/validator/ValidatorInterface";
import { HTMLInputTypeAttribute } from "react";
import { ItemInterface, MsgPlacement } from "./ItemInterface";
import { Form } from "../Form";

export abstract class AbstractItem implements ItemInterface {
  public name: string | null;
  public type: HTMLInputTypeAttribute | "select" | "textarea";
  public entity: string | null;
  public fieldName: string | null;
  public formName: string | null;
  public textName: string | null;
  public textNameGender: boolean;
  public filters: FilterInterface[];
  public validators: ValidatorInterface[];
  public mask: MaskInterface | null;
  public msgPlacement: MsgPlacement | null;
  public tags: string[];
  public widgetType: any;
  public itemType: any;
  public defaultValue: any;
  public widgetClassName: string | null = null;
  public itemClassName: string | null = null;
  public data: Map<string, any> = new Map();

  constructor({
    widgetType,
    itemType,
    name = null,
    fieldName,
    type = "text",
    entity = null,
    validators = [],
    textNameGender = true,
    formName = null,
    textName = null,
    filters = [],
    mask = null,
    msgPlacement = null,
    tags = [],
    defaultValue = null,
    widgetClassName = null,
    itemClassName = null,
    data,
  }: ItemDef) {
    this.widgetType = widgetType;
    this.itemType = itemType;
    this.name = name;
    this.fieldName = fieldName;
    this.type = type;
    this.entity = entity;
    this.formName = formName || fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
    this.textName = textName || fieldName;
    this.textNameGender = textNameGender;
    this.filters = filters.length > 0 ? filters : [new StripTagsFilter()];
    this.validators = validators;
    this.mask = mask;
    this.msgPlacement = msgPlacement;
    this.tags = tags;
    this.defaultValue = defaultValue;
    this.widgetClassName = widgetClassName;
    this.itemClassName = itemClassName;
    this.data = data || new Map<string, any>();
  }

  getName(): string | null {
    return this.name;
  }

  getType(): HTMLInputTypeAttribute {
    return this.type;
  }

  getEntity(): string | null {
    return this.entity;
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

  getWidgetType(): any {
    return this.widgetType;
  }

  getItemType(): any {
    return this.itemType;
  }

  getDefaultValue(): any {
    return this.defaultValue;
  }

  getWidgetClassName(): string | null {
    return this.widgetClassName;
  }

  getItemClassName(): string | null {
    return this.itemClassName;
  }

  getData(): Map<string, any> {
    return this.data;
  }

  abstract getWidgetProps(form: Form, itemHook: any, data?: any): Object | null;

  abstract getItemProps(form: Form, itemHook: any): Object | null;
}
