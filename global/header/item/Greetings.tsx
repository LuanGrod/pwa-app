"use client";

import { useStoreHydration } from "@/hook/useStoreHydration";
import { useAuthStore } from "@/provider/AuthProvider";
import Image from "next/image";

type Props = {};

export default function Greetings({}: Props) {
  const isHydrated = useStoreHydration();
  const { user } = useAuthStore((state) => state);

  return (
    <div className="greetings">
      {isHydrated ? (
        <>
          <Image
            src={`${user.avatarUrl || "/project/assets/avatar-mock.png"}`}
            alt="Foto do usuário"
            width={45}
            height={45}
            className="avatar"
          />
          <p className="title">Olá {user.name}!</p>
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
