import ConfiguracoesDrawer from "@/component/overlay/drawer/Configuracoes";
import Header from "@global/component/header/MenuTitleLogo";
import { ReactNode, unstable_ViewTransition as ViewTransition } from "react";
import Footer from "@/component/footer/Footer";

type Props = {
  children: ReactNode;
};

export default function HomeStructure({ children }: Props) {
  return (
    <>
      <ViewTransition default="handle">
        <Header title="Como deseja estudar?" menu={<ConfiguracoesDrawer />} />
        <main className="content-wrapper">{children}</main>
      </ViewTransition>
      <Footer />
    </>
  );
}
