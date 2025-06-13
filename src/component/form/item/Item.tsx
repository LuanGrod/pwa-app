"use client";

import { Form } from "@form/Form";
import { ItemInterface } from "@/form/item/ItemInterface";
import { useState } from "react";
import OlhoAberto from "@global/icons/OlhoAberto";
import OlhoFechado from "@global/icons/OlhoFechado";

export default function Item({ item, form, itemHook }: { item: ItemInterface; form: Form; itemHook: any }) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <div className="form-item">
      <label htmlFor={item.getName()}>{item.getFormName()}:</label>
      <input
        type={item.getType() == "password" ? (isVisible ? "text" : "password") : item.getType()}
        id={item.getName()}
        name={item.getName()}
        value={itemHook.value}
        onChange={itemHook.onChange}
        onBlur={itemHook.onBlur}
        className={itemHook.error ? "field-error" : ""}
        placeholder={`Digite aqui ${item.getTextNameGender() ? "seu" : "sua"} ${item.getTextName()}...`}
      />
      {item.getType() === "password" && (
        <div onClick={() => setIsVisible(!isVisible)} className="toggleVisibility">
          {isVisible ? <OlhoAberto size={26} /> : <OlhoFechado size={26} />}
        </div>
      )}
      {form.defaultMsgPlacement == "below" && <div className="error">{itemHook.error}</div>}
    </div>
  );
}
