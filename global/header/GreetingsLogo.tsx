"use client";

import Image from "next/image";
import LogoOverlay from "../LogoOverlay";
import BaseHeader from "./Base";
import styles from "./GreetingsLogo.module.css";
import { useAuthStore } from "@/provider/AuthProvider";
import { useStoreHydration } from "@/hook/useStoreHydration";

type Props = {};

export default function GreetingsLogo({}: Props) {
  const isHydrated = useStoreHydration();
  const { user } = useAuthStore((state) => state);

  const greetingsElement = () => {
    return (
      <div className={styles.container}>
        {isHydrated ? (
          <>
            <Image
              src={`${user.avatarUrl || "/project/assets/avatar-mock.png"}`}
              alt="Foto do usuário"
              width={45}
              height={45}
              style={{ borderRadius: "100%" }}
            />
            <p className={styles.title}>Olá {user.name}!</p>
          </>
        ) : (
          <>
            <div className="w-[45px] h-[45px] rounded-full bg-gray-600 animate-pulse" />
            <div className="w-[120px] h-[20px] bg-gray-600 animate-pulse rounded" />
          </>
        )}
      </div>
    );
  };

  return (
    <>
      <BaseHeader left={greetingsElement()} center={<LogoOverlay />} />
    </>
  );
}
