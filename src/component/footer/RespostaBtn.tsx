"use client";

import useFlashcards from "@/store/FlashcardStore";
import Logo from "../icon/Logo";
import { useUser } from "@global/hook/auth/useUser";

type Props = {
  value: string;
  color: string;
  title: string;
  onClick: () => void;
};

export default function RespostaBtn({ color, title, value, onClick }: Props) {

  return (
    <button onClick={onClick} className="resposta">
      <Logo color={color} size={30} />
      <p className="title">{title}</p>
    </button>
  );
}
