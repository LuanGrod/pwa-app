import { Form } from "@global/form/Form";
import { ConfirmarSenha } from "@global/form/item/prebuilt/ConfirmarSenha";
import { Senha } from "@global/form/item/prebuilt/Senha";

const formItems = [new Senha({ entity: "estudantes" }), new ConfirmarSenha({entity: "estudantes" })];
const form = new Form(formItems, "below");

export default form;
