import Image from "next/image";
import Link from "next/link";
import FooterItem from "./FooterItem";

type Props = {
  active?: string;
};

export default function Footer({ active }: Props) {
  const isActive = (path: string) => {
    return active === path ? true : false;
  };

  return (
    <footer className="z-50 fixed bottom-0 flex-none w-full flex pt-[10px] pb-[15px] items-center justify-evenly box-border bg-background-variation">
      <FooterItem isActive href="/" image="/assets/icons/Casa.svg" label="Início" />
      <FooterItem href="/estatisticas" image="/assets/icons/Grafico.svg" label="Estatísticas" />
      <FooterItem href="/conquistas" image="/assets/icons/Foguete.svg" label="Conquistas" />
      <FooterItem href="/salvos" image="/assets/icons/Bandeira.svg" label="Salvos" />
    </footer>
  );
}