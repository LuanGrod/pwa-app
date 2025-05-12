import { Dispatch, SetStateAction } from "react";
import ValidatorInterface from "../../../validator/ValidatorInterface";

export type Field = {
  fieldName: string;
  label?: string;
  prepend?: string;
  labelPosition?: Position;
  validators?: ValidatorInterface[];
  displayOnField?: boolean;
  validatorMessages?: ValidatorMessageGroup[];
  setValidatorMessages?: Dispatch<SetStateAction<ValidatorMessageGroup[]>>;
  notificationType?: NotificationType;
  setNotificationType?: Dispatch<SetStateAction<NotificationType>>;
  labelGender?: NumericBoolean;
  singleValue?: NumericBoolean;
  variant?: FieldVariant;
};
