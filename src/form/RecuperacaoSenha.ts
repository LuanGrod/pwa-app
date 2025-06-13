import { Form } from "./Form";
import { Email } from "./item/prebuilt/Email";

const formItems = [new Email({ entity: "estudantes" })];
const form = new Form(formItems, "below");

export default form;
