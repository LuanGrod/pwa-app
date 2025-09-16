import { Form } from "@global/form/Form";
import { Email } from "@global/form/item/prebuilt/Email";

const formItems = [new Email({ entity: "estudantes" })];
const form = new Form(formItems, "below");

export default form;
