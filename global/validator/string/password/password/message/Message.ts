import { ItemInterface } from "@global/form/item/ItemInterface";
import { MessageInterface } from "@global/validator/MessageInterface";
export class Message implements MessageInterface {
  protected options: {
    minLength: number;
    minUppercase: number;
    minLowercase: number;
    minNumber: number;
    minSpecialChar: number;
  };

  constructor(options: {
    minLength: number;
    minUppercase: number;
    minLowercase: number;
    minNumber: number;
    minSpecialChar: number;
  }) {
    this.options = options;
  }

  getMsg(item: ItemInterface): string {
    const { minLength, minLowercase, minUppercase, minNumber, minSpecialChar } = this.options;
    const parts: string[] = [];

    if (minLength > 0) parts.push(this.pluralize(minLength, "caractere", "caracteres"));
    if (minLowercase > 0) parts.push(this.pluralize(minLowercase, "letra minúscula", "letras minúsculas"));
    if (minUppercase > 0) parts.push(this.pluralize(minUppercase, "letra maiúscula", "letras maiúsculas"));
    if (minNumber > 0) parts.push(this.pluralize(minNumber, "número", "números"));
    if (minSpecialChar > 0) parts.push(this.pluralize(minSpecialChar, "caractere especial", "caracteres especiais"));

    const requirements = parts.join(", ").replace(/, ([^,]*)$/, " e $1");

    if (item.getTags().includes("multipleRows")) {
      const pronoun = item.getTextNameGender() ? "Os" : "As";
      return `${pronoun} ${item.getTextName()} precisam ter pelo menos ${requirements}`;
    }

    const pronoun = item.getTextNameGender() ? "O" : "A";
    return `${pronoun} ${item.getTextName()} precisa ter pelo menos ${requirements}`;
  }

  pluralize(count: number, singular: string, plural: string) {
    return count === 1 ? `${count} ${singular}` : `${count} ${plural}`;
  }
}
