import { Dispatch, InputHTMLAttributes, SetStateAction } from "react"

export type Input = InputHTMLAttributes<HTMLInputElement> & {
  setValue?: Dispatch<SetStateAction<any>>;
}