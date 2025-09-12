"use client";

import Logo from "@/component/icon/Logo";

type Props = {
  color: string;
  title: string;
  onClick: () => void;
};

export default function RespostaBtn({ color, title, onClick }: Props) {

  return (
    <button onClick={onClick} className="resposta">
      <Logo color={color} size={30} />
      <p className="title">{title}</p>
    </button>
  );
}
