"use client";

import { useForm } from "@hook/form/useForm";
import Item from "./item/Item";
import { Form as FormConfigProps } from "@/form/Form";
import { ItemInterface } from "@/form/item/ItemInterface";
import SubmitHandlerInterface from "@/form/handler/submit/SubmitHandlerInterface";
import { Shadow as ShadowBtn } from "../../../global/button/Shadow";
import Notification from "./Notification";
import Loading2 from "@global/overlay/popup/dialog/Loading2";

type FormProps = {
  formConfig: FormConfigProps;
  submitHandler: SubmitHandlerInterface;
  id?: string;
};

function Form({ formConfig, submitHandler, id }: FormProps) {
  const { items, handleSubmit, submitReturn, loading } = useForm(formConfig.items, submitHandler, id);

  return (
    <form onSubmit={handleSubmit}>
      {formConfig.items.map((config: ItemInterface, idx: number) => (
        <Item key={config.getName()} form={formConfig} item={config} itemHook={items[idx]} />
      ))}
      <ShadowBtn type="submit" disabled={loading}>
        ENTRAR
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
      <Loading2 loading={loading} />
      {submitReturn && (
        <Notification type={submitReturn.success ? "success" : "danger"} message={submitReturn.message} />
      )}
    </form>
  );
}

export default Form;
