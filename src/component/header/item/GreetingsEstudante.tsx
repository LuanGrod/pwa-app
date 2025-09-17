"use client";

import { useEstudante } from "@/store/EstudanteStore";
import Greetings from "@global/component/header/item/Greetings";

type Props = {};

export default function GreetingsEstudante({ }: Props) {
  const { estudante, _hasHydrated } = useEstudante()

  return (
    <Greetings name={estudante.nomeCompleto} imageUrl={estudante.urlImagem} loading={!_hasHydrated} />
  );
}
