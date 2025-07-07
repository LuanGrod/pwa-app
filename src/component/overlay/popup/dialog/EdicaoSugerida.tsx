"use client";

import { InsertHandler } from "@/form/handler/submit/InsertHandler";
import Sugestion from "./Sugestion";
import { Form } from "@/form/Form";
import { Hidden } from "@/form/item/prebuilt/Hidden";
import { Conteudo } from "@/form/item/prebuilt/Conteudo";

type Props = {
  open?: boolean;
  onClose?: () => void;
  insertEntity: string;
  formEntity: string;
  estudanteId: string;
  estudanteName?: string;
  conteudoId: string | null;
  conteudoName: string;
};

export default function EdicaoSugerida({
  onClose,
  open,
  conteudoId,
  conteudoName,
  formEntity,
  insertEntity,
  estudanteName = "id_estudante",
  estudanteId,
}: Props) {
  const insertHandler = new InsertHandler({ entity: insertEntity, needsAuthorization: true });

  const formItems = [
    new Conteudo({ entity: formEntity }),
    new Hidden({ entity: formEntity, name: conteudoName, defaultValue: conteudoId }),
    new Hidden({ entity: formEntity, name: estudanteName, defaultValue: estudanteId }),
  ];
  const form = new Form(formItems, "below");

  return <Sugestion formConfig={form} insertHandler={insertHandler} onClose={onClose} open={open} />;
}
