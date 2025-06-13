import { Form } from "./Form";
import { Senha } from "./item/prebuilt/Senha";

const formItems = [new Senha({ entity: "estudantes" })];
const form = new Form(formItems, "below");

export default form;
