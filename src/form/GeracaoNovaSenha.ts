import { Form } from "./Form";
import { ConfirmarSenha } from "./item/prebuilt/ConfirmarSenha";
import { Senha } from "./item/prebuilt/Senha";

const formItems = [new Senha({ entity: "estudantes" }), new ConfirmarSenha({entity: "estudantes" })];
const form = new Form(formItems, "below");

export default form;
