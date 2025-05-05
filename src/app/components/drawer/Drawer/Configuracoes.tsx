import { Modal } from "@public/global/js/types/Modal";
import { BottomDrawer } from "../../global/drawer/Bottom";
import DrawerLinkWithIcon from "../../global/drawer/LinkWithIcon";
import Email from "../../global/icons/Email";
import Faturas from "../../global/icons/Faturas";
import Info from "../../global/icons/Info";
import MudarTema from "../../global/icons/MudarTema";
import Sair from "../../global/icons/Sair";
import Usuario from "../../global/icons/Usuario";
import { RefObject } from "react";
import Divider from "../../global/Divider";

type Props = {
  modalRef: RefObject<Modal | null>;
};

export default function ConfiguracoesDrawer({ modalRef }: Props) {
  return (
    <BottomDrawer ref={modalRef} title="Configurações">
      <div className="flex flex-col gap-5">
        <DrawerLinkWithIcon href="/perfil" label="Perfil" icon={<Usuario size={33} />} />
        <DrawerLinkWithIcon href="/faturas" label="Faturas" icon={<Faturas size={33} />} />
        <DrawerLinkWithIcon href="/mudar-tema" label="Mudar tema" icon={<MudarTema size={33} />} />
        <DrawerLinkWithIcon href="mailto:contato@medrqe.com" label="contato@medrqe.com" icon={<Email size={33} />} />
        <DrawerLinkWithIcon href="/mudar-tema" label="Como estudar?" icon={<Info size={33} />} />
        <Divider />
        <DrawerLinkWithIcon href="/mudar-tema" label="Sair" icon={<Sair size={33} />} />
      </div>
    </BottomDrawer>
  );
}
