"use client";

import { useRef } from "react";
import Elipse from "../global/icons/Elipse";
import Logo from "../icons/Logo";
import { Modal } from "@public/global/js/types/Modal";
import ConfiguracoesDrawer from "../drawer/Drawer/Configuracoes";
import styles from "./Home.module.css";

type Props = {};

export default function Home({}: Props) {
  const drawerRef = useRef<Modal>(null);

  return (
    <header className={styles.container}>
      <div onClick={() => drawerRef.current?.toggle()} className={styles.icon_container}>
        <Elipse size={29} changeOnTheme />
      </div>
      <p className={styles.title}>Como deseja estudar?</p>
      <div className={styles.icon_overlay}>
        <Logo size={29} />
      </div>
      <ConfiguracoesDrawer drawerRef={drawerRef} />
    </header>
  );
}
