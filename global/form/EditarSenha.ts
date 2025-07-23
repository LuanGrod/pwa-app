import { Form } from "./Form";
import { ConfirmarSenha } from "./item/prebuilt/ConfirmarSenha";
import { Senha } from "./item/prebuilt/Senha";

const formItems = [
  new Senha({
    entity: "estudantes",
    fieldName: "senha_atual",
    formName: "Senha atual",
    textName: "senha atual",
  }),
  new Senha({
    entity: "estudantes",
    fieldName: "nova_senha",
    formName: "Nova senha",
    textName: "nova senha",
  }),
  new ConfirmarSenha({ entity: "estudantes",  data: new Map<string, any>([["match", "estudantes_nova_senha"]]) }),
];
const form = new Form(formItems, "below");

export default form;
