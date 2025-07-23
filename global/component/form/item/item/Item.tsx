"use client";

import { Form } from "@global/form/Form";
import { ItemInterface } from "@global/form/item/ItemInterface";
import React from "react";
import Wrapper from "../wrapper/Wrapper";

/**
 * form-item + label + widget + error
 * @param item: ItemInterface
 * @param itemHook: any
 * @param form: Form
 * @returns 
 */
export default function Item({ item, form, itemHook }: { item: ItemInterface; form: Form; itemHook: any }) {

  const widget = React.createElement(item.getWidgetType(), item.getWidgetProps(form, itemHook));

  return <Wrapper form={form} item={item} itemHook={itemHook} widget={widget} />;
}
