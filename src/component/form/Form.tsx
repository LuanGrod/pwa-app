"use client";

import { useForm } from "@hook/form/useForm";
import Item from "./item/Item";
import { Form as FormConfigProps } from "@/form/Form";
import { ItemInterface } from "@/form/item/ItemInterface";
import SubmitHandlerInterface from "@/form/handler/submit/SubmitHandlerInterface";
import { Shadow as ShadowBtn } from "../button/Shadow";
import Notification from "./Notification";
import Loading from "../overlay/popup/dialog/Loading";
import { useAuthStore } from "@/provider/AuthProvider";

type FormProps = {
  formConfig: FormConfigProps;
  submitHandler: SubmitHandlerInterface;
  id?: string;
};

function Form({ formConfig, submitHandler, id }: FormProps) {
  const { items, handleSubmit, submitReturn, loading } = useForm(formConfig.items, submitHandler, id);

  const { setUser } = useAuthStore((state) => state);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setUser({
      id: "123",
      token: "4329481284812",
      avatarUrl: "/project/assets/avatar-mock.png",
      name: "Israel",
      planType: "free",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {formConfig.items.map((config: ItemInterface, idx: number) => (
        <Item key={config.getName()} form={formConfig} item={config} itemHook={items[idx]} />
      ))}
      <ShadowBtn type="submit" disabled={loading}>
        ENTRAR
      </ShadowBtn>
      <ShadowBtn onClick={handleClick}>set user</ShadowBtn>
      {formConfig.defaultMsgPlacement === "form" &&
        formConfig.items.map(
          (config: ItemInterface, idx: number) =>
            items[idx].error && (
              <div key={`${config.getName()}-error`} className="error">
                {items[idx].error}
              </div>
            )
        )}
      <Loading loading={loading} />
      {submitReturn && (
        <Notification type={submitReturn.success ? "success" : "danger"} message={submitReturn.message} />
      )}
    </form>
  );
}

export default Form;
