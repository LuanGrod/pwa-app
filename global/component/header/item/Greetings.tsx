"use client";

import { useEstudante } from "@/store/EstudanteStore";
import UploadImage from "@global/component/image/UploadImage";
import Image from "next/image";

type Props = {
  name?: string;
  imageUrl?: string;
  imageAlt?: string;
  imagePlaceholder?: string;
  loading?: boolean;
};

export default function Greetings({ imageAlt = "Foto do usuário", imagePlaceholder = "/project/assets/avatar-mock.webp", imageUrl, loading, name }: Props) {

  return (
    <div className="greetings">
      {loading ? (
        <>
          <div className="avatar skeleton" />
          <div className="title skeleton" />
        </>
      ) : (
        <>
          {
            imageUrl ? (<UploadImage
              src={imageUrl}
              alt={imageAlt}
              width={45}
              height={45}
              className="avatar"
              priority
            />) : (
              <Image
                src={imagePlaceholder}
                alt={imageAlt}
                width={45}
                height={45}
                className="avatar"
                priority
              />
            )
          }
          <p className="title">Olá {name}!</p>
        </>
      )}
    </div>
  );
}
