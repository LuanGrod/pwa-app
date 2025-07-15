"use client";

import { Form } from "@global/form/Form";
import { ItemInterface } from "@global/form/item/ItemInterface";
import React from "react";
import Wrapper from "../wrapper/Wrapper";

export default function Item({ item, form, itemHook }: { item: ItemInterface; form: Form; itemHook: any }) {
  
  const widget = React.createElement(item.getWidgetType(), item.getWidgetProps(form, itemHook));

  return <Wrapper form={form} item={item} itemHook={itemHook} widget={widget} />;
}
