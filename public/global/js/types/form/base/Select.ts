import { Dispatch, InputHTMLAttributes, SetStateAction } from "react";

export type Select = InputHTMLAttributes<HTMLSelectElement> & {
  setValue?: Dispatch<SetStateAction<any>>;
  options: Option[];
};
