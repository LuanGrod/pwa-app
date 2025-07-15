"use client";

import useFlashcards from "@/store/FlashcardStore";
import Logo from "../icon/Logo";
import { useUser } from "@global/hook/auth/useUser";

type Props = {
  value: string;
  color: string;
  title: string;
};

export default function RespostaBtn({ color, title, value }: Props) {
  const { id: userId } = useUser();

  const { registerAnswer } = useFlashcards();

  return (
    <button onClick={e => registerAnswer(userId, value)} className="resposta">
      <Logo color={color} size={30} />
      <p className="title">{title}</p>
    </button>
  );
}
