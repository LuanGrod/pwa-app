import { Form } from "./Form";
import { Email } from "./item/prebuilt/Email";
import { Senha } from "./item/prebuilt/Senha";

const formItems = [new Email({ entity: "estudantes" }), new Senha({ entity: "estudantes" })];
const form = new Form(formItems, "below");

export default form;
