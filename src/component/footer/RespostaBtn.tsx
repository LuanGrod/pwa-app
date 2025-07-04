"use client";

import { useUser } from "@/hook/auth/useUser";
import Logo from "../icon/Logo";
import { Insert } from "@/request/builder/Insert";

type Props = {
  flashcardId: string;
  value: string;
  color: string;
  title: string;
  toggle: () => void;
};

export default function RespostaBtn({ color, title, flashcardId, toggle, value }: Props) {
  const { id: userId } = useUser();

  const handleClick = async () => {
    const insertData = {
      respostas_flashcards_id_estudante: userId,
      respostas_flashcards_id_flashcard: flashcardId,
      respostas_flashcards_resposta2: value,
    };

    const insert = new Insert({
      entity: "respostas-flashcards",
      data: insertData,
    });

    const response = await insert.build(true);

    toggle();
  };

  return (
    <button onClick={handleClick} className="resposta">
      <Logo color={color} size={30} />
      <p className="title">{title}</p>
    </button>
  );
}
