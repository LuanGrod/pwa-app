"use client";

import { useForm } from "@global/hook/form/useForm";
import { Form as FormConfigProps } from "@global/form/Form";
import { ItemInterface } from "@global/form/item/ItemInterface";
import SubmitHandlerInterface from "@global/form/handler/submit/SubmitHandlerInterface";
import { Shadow as ShadowBtn } from "../button/Shadow";
import Notification from "./Notification";
import Loading2 from "@global/component/overlay/popup/dialog/Loading2";
import React, { useEffect } from "react";

type FormProps = {
  formConfig: FormConfigProps;
  submitHandler: SubmitHandlerInterface;
  id?: string;
  submitLabel?: string;
};

function Form<T>({ formConfig, submitHandler, id, submitLabel = "ENTRAR" }: FormProps) {
  const { items, handleSubmit, submitReturn, loading } = useForm<T>(formConfig.items, submitHandler, id);

  return (
    <form onSubmit={handleSubmit}>
      {formConfig.items.map(
        (config: ItemInterface, idx: number) => {
          return React.createElement(
            config.getItemType(),
            {
              key: config.getName(),
              ...config.getItemProps(formConfig, items[idx])
            }
          );
        }
      )}
      <ShadowBtn type="submit" disabled={loading}>
        {submitLabel}
      </ShadowBtn>
      {formConfig.defaultMsgPlacement === "form" &&
        formConfig.items.map(
          (config: ItemInterface, idx: number) =>
            items[idx].error && (
              <div key={`${config.getName()}-error`} className="error">
                {items[idx].error}
              </div>
            )
        )}
      <Loading2 loading={loading} overlay />
      {submitReturn && (
        <Notification type={submitReturn.success ? "success" : "danger"} message={submitReturn.message} />
      )}
    </form>
  );
}

export default Form;
