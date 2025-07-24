import { Estudante as EstudanteType } from "@/type/Entities";
import { BottomDrawer } from "@global/component/overlay/drawer/Bottom"
import { UpdateHandler } from "@global/form/handler/submit/api/UpdateHandler";
import Form from "@global/component/form/Form";
import { Email } from "@global/form/item/prebuilt/Email";
import { Form as FormConfig } from "@global/form/Form";
import { Whatsapp } from "@global/form/item/prebuilt/Whatsapp";
import { BrazilianPhoneFormatter } from "@global/formatter/phone/Brazilian";
import { Textarea } from "@global/form/item/Textarea";
import { Text } from "@global/form/item/Text";
import { MaxLengthValidatorFactory } from "@global/validator/string/maxLength/MaxLengthValidatorFactory";
import { DataNascimento } from "@global/form/item/prebuilt/DataNascimento";
import { RefreshOnSuccessUpdate } from "@global/request/response/handler/api/RefreshOnSuccessUpdate";

type Props = {
  open: boolean;
  onClose: () => void;
  data: EstudanteType;
}

export default function PerfilEdicao({ open, onClose, data }: Props) {
  const submitHandler = new UpdateHandler({
    entity: "estudantes",
    needsAuthorization: true,
    responseHandler: new RefreshOnSuccessUpdate(),
  });

  const phoneFormatter = new BrazilianPhoneFormatter();

  const formItems = [
    new Email({
      entity: "estudantes",
      defaultValue: data.estudantes_email
    }),
    new Whatsapp({
      entity: "estudantes",
      defaultValue: phoneFormatter.format(data.estudantes_whatsapp)
    }),
    new Textarea({
      entity: "estudantes",
      defaultValue: data.estudantes_instituicoes_interesse,
      formName: "Instituições de interesse",
      fieldName: "instituicoes_interesse",
      validators: [MaxLengthValidatorFactory.create(2000)],
    }),
    new Text({
      entity: "estudantes",
      defaultValue: data.estudantes_especialidade,
      formName: "Objetivo de especialidade",
      fieldName: "especialidade",
      textName: "especialidade de interesse",
      textNameGender: false,
      validators: [MaxLengthValidatorFactory.create(200)],
    }),
    new DataNascimento({
      entity: "estudantes",
      defaultValue: data.estudantes_data_nascimento,
    })
  ];

  const formConfig = new FormConfig(formItems, "below");

  return (
    <BottomDrawer open={open} onClose={onClose} title="Edição">
      <Form formConfig={formConfig} submitHandler={submitHandler} submitLabel="SALVAR" />
    </BottomDrawer>
  )
}