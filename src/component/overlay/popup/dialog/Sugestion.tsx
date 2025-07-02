"use client";

import Form from "@/component/form/Form";
import Dialog from "@global/overlay/popup/dialog/Dialog";
import { Form as FormConfigProps } from "@/form/Form";
import SubmitHandlerInterface from "@/form/handler/submit/SubmitHandlerInterface";

type Props = {
  insertHandler: SubmitHandlerInterface;
  formConfig: FormConfigProps;
  open?: boolean;
  onClose?: () => void;
};

export default function Sugestion({ onClose, open, formConfig, insertHandler }: Props) {
  return (
    <Dialog open={open} onClose={onClose} title="Sugira uma edição:" overlay>
      <Form submitLabel="ENVIAR" formConfig={formConfig} submitHandler={insertHandler} />
    </Dialog>
  );
}
