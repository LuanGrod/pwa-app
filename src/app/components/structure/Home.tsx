import { ReactNode } from "react";
import Footer from "../footer/Footer";
import Header from "../global/header/MenuTitleLogo";
import styles from "./Structure.module.css";
import ConfiguracoesDrawer from "../drawer/Drawer/Configuracoes";

type Props = {
  children: ReactNode;
};

export default function HomeStructure({ children }: Props) {
  return (
    <>
      <Header title="Como deseja estudar?" menu={<ConfiguracoesDrawer/>}/>
      <main className={styles.content}>{children}</main>
      <Footer />
    </>
  );
}
