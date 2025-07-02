import { Form } from "@/form/Form";
import { ItemInterface } from "@/form/item/ItemInterface";
import React, { useState } from "react";
import Wrapper from "../wrapper/Wrapper";

type Props = {}

export default function PasswordItem({ item, form, itemHook }: { item: ItemInterface; form: Form; itemHook: any }) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  
  const widget = React.createElement(item.getWidgetType(), item.getWidgetProps(form, itemHook, {isVisible, setIsVisible}));

  return <Wrapper form={form} item={item} itemHook={itemHook} widget={widget} />;
}