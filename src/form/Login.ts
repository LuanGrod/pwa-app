import { Form } from "./Form";
import { RequiredValidatorFactory } from "@validator/required/RequiredValidatorFactory";
import { Item } from "./item/Item";
import { EmailValidatorFactory } from "@/validator/email/EmailValidatorFactory";

const formItems = [
  new Item({
    name: "email",
    entity: "estudantes",
    validators: [RequiredValidatorFactory.create(), EmailValidatorFactory.create()],
  }),
  new Item({
    type: "password",
    name: "senha",
    entity: "estudantes",
    validators: [RequiredValidatorFactory.create()],
  }),
];
const form = new Form(formItems, "below");

export default form;
