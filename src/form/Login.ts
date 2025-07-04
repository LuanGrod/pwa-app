import { Form } from "./Form";
import { Email } from "./item/prebuilt/Email";
import { Senha } from "./item/prebuilt/Senha";

const formItems = [new Email({ entity: "estudantes", defaultValue: "mail@mail.com" }), new Senha({ entity: "estudantes", defaultValue: "Senha123!" })];
const form = new Form(formItems, "below");

export default form;
