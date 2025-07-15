import { Form } from "@global/form/Form";
import { ItemInterface } from "@global/form/item/ItemInterface";
import React from "react";
import Wrapper3 from "../wrapper/Wrapper3";

type Props = {};

export default function HiddenItem({ item, form, itemHook }: { item: ItemInterface; form: Form; itemHook: any }) {
  const widget = React.createElement(item.getWidgetType(), item.getWidgetProps(form, itemHook));

  return <Wrapper3 item={item} form={form} itemHook={itemHook} widget={widget} />;
}
