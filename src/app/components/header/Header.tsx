"use client";

import { BottomDrawer } from "../global/drawer/Bottom";
import { useRef } from "react";
import Usuario from "../global/icons/Usuario";
import DrawerLinkWithIcon from "../global/drawer/LinkWithIcon";
import Faturas from "../global/icons/Faturas";
import MudarTema from "../global/icons/MudarTema";
import Email from "../global/icons/Email";
import Info from "../global/icons/Info";
import Sair from "../global/icons/Sair";
import Elipse from "../global/icons/Elipse";
import Logo from "../icons/Logo";
import { Modal } from "@public/global/js/types/Modal";
import ConfiguracoesDrawer from "../drawer/Drawer/Configuracoes";

type Props = {};

export default function Header({}: Props) {
  const modalRef = useRef<Modal>(null);

  return (
    <div className="header-container">
      <div onClick={() => modalRef.current?.toggle()} className="icon-container">
        <Elipse size={29} />
      </div>
      <p className="title">Como deseja estudar?</p>
      <div className="icon-container-overlay">
        <Logo size={29} />
      </div>
     <ConfiguracoesDrawer modalRef={modalRef} />
    </div>
  );
}
