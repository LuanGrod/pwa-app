import { Form } from "@global/form/Form";
import { ItemInterface } from "@global/form/item/ItemInterface";
import React from "react";
import Wrapper2 from "../wrapper/Wrapper2";

type Props = {}

/**
 * form-item + widget + error
 * @param item: ItemInterface
 * @param itemHook: any
 * @param form: Form
 * @returns 
 */
export default function Item2({ item, form, itemHook }: { item: ItemInterface; form: Form; itemHook: any }) {
  const widget = React.createElement(item.getWidgetType(), item.getWidgetProps(form, itemHook));

  return <Wrapper2  item={item} form={form} itemHook={itemHook} widget={widget} />;
}