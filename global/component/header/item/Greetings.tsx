"use client";

import { useEstudante } from "@/store/EstudanteStore";
import UploadImage from "@global/component/atomic/UploadImage";
import Usuario from "@global/component/icons/Usuario";
import Image from "next/image";

type Props = {};

export default function Greetings({ }: Props) {
  const { estudante, _hasHydrated } = useEstudante()

  return (
    <div className="greetings">
      {_hasHydrated ? (
        <>
          {
            estudante.urlImagem ? (<UploadImage
              src={`${estudante.urlImagem}`}
              alt="Foto do usuário"
              width={45}
              height={45}
              className="avatar"
            />) : (
              <div className="avatar"><Usuario size={35} changeOnTheme /></div>
            )
          }
          <p className="title">Olá {estudante.nomeCompleto}!</p>
        </>
      ) : (
        <>
          <div className="avatar skeleton" />
          <div className="title skeleton" />
        </>
      )}
    </div>
  );
}
