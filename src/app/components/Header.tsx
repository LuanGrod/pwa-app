"use client";
import Image from "next/image";
import useScrollDirection from "../hooks/useScrollDirection";

type Props = {};

export default function Header({}: Props) {
  const scrollDirection = useScrollDirection();
  
  return (
    <div className="z-50 fixed top-0 flex-none w-full flex p-[18px] items-center justify-between box-border border-b-1 border-background-variation bg-background">
      <Image src="/assets/Foto.png" alt="foto de perfil do usuário" width={45} height={45} />
      <div className="w-[45px] h-[45px] bg-background-variation rounded-full flex items-center justify-center">
        <Image src="/assets/Logo.svg" alt="logo do aplicativo medRQE" width={29} height={32} />
      </div>
      <div className="w-[45px] h-[45px] bg-background-variation rounded-full flex items-center justify-center">
        <Image src="/assets/icons/Elipse.svg" alt="configurações" width={29} height={29} className="rotate-90 icon" />
      </div>
    </div>
  );
}
