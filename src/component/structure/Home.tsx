import ConfiguracoesDrawer from "@/component/overlay/drawer/Configuracoes";
import Header from "@global/header/MenuTitleLogo";
import { ReactNode, unstable_ViewTransition as ViewTransition } from "react";
import styles from "./Structure.module.css";
import Footer from "../footer/Footer";

type Props = {
  children: ReactNode;
};

export default function HomeStructure({ children }: Props) {
  return (
    <>
      <ViewTransition default="handle">
        <Header title="Como deseja estudar?" menu={<ConfiguracoesDrawer />} />
        <main className={styles.content}>{children}</main>
      </ViewTransition>
      <Footer />
    </>
  );
}
