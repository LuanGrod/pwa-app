"use client";

import Divider from "@global/atomic/Divider";
import Email from "@global/icons/Email";
import Faturas from "@global/icons/Faturas";
import Info from "@global/icons/Info";
import MudarTema from "@global/icons/MudarTema";
import Sair from "@global/icons/Sair";
import Usuario from "@global/icons/Usuario";
import DrawerLinkWithIcon from "@global/overlay/drawer/LinkWithIcon";
import { Overlay } from "@public/global/js/types/Overlay";
import { RefObject } from "react";
import styles from "./Configuracoes.module.css";
import { BottomRefDrawer } from "@global/overlay/drawer/BottomRef";

type Props = {
  menuRef?: RefObject<Overlay | null>;
};

export default function ConfiguracoesDrawer({ menuRef }: Props) {
  return (
    <BottomRefDrawer ref={menuRef} title="Configurações">
      <div className={styles.container}>
        <DrawerLinkWithIcon href="/perfil" label="Perfil" icon={<Usuario size={33} changeOnTheme />} />
        <DrawerLinkWithIcon href="/faturas" label="Faturas" icon={<Faturas size={33} changeOnTheme />} />
        <DrawerLinkWithIcon href="/mudar-tema" label="Mudar tema" icon={<MudarTema size={33} changeOnTheme />} />
        <DrawerLinkWithIcon
          href="mailto:contato@medrqe.com"
          label="contato@medrqe.com"
          icon={<Email size={33} changeOnTheme />}
        />
        <DrawerLinkWithIcon href="/como-estudar" label="Como estudar?" icon={<Info size={33} changeOnTheme />} />
        <Divider />
        <DrawerLinkWithIcon href="/sair" label="Sair" icon={<Sair size={33} changeOnTheme />} />
      </div>
    </BottomRefDrawer>
  );
}
