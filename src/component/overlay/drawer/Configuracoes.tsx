"use client";

import Divider from "@global/component/divider/Divider";
import Email from "@global/component/icon/Email";
import Faturas from "@global/component/icon/Faturas";
import Info from "@global/component/icon/Info";
import MudarTema from "@global/component/icon/MudarTema";
import Sair from "@global/component/icon/Sair";
import Usuario from "@global/component/icon/Usuario";
import DrawerLinkWithIcon from "@global/component/overlay/drawer/item/LinkWithIcon";
import DrawerBtnWithIcon from "@global/component/overlay/drawer/item/BtnWithIcon";
import { Overlay } from "@public/global/js/types/Overlay";
import { RefObject } from "react";
import { BottomRefDrawer } from "@global/component/overlay/drawer/BottomRef";
import useTheme from "@global/hook/useTheme";

type Props = {
  menuRef?: RefObject<Overlay | null>;
};

export default function ConfiguracoesDrawer({ menuRef }: Props) {
  const { toggleTheme } = useTheme({});

  return (
    <BottomRefDrawer ref={menuRef} title="Configurações">
      <div className="configuracoes-container">
        <DrawerLinkWithIcon href="/perfil" label="Perfil" icon={<Usuario size={33} changeOnTheme />} />
        <DrawerLinkWithIcon href="/faturas" label="Faturas" icon={<Faturas size={33} changeOnTheme />} />
        <DrawerBtnWithIcon onClick={toggleTheme} label="Mudar tema" icon={<MudarTema size={33} changeOnTheme />} />
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
