"use client";

import { InsertHandler } from "@global/form/handler/submit/api/InsertHandler";
import Sugestion from "./Sugestion";
import { Form } from "@global/form/Form";
import { Hidden } from "@global/form/item/Hidden";
import { Conteudo } from "@global/form/item/prebuilt/Conteudo";
import { Insert as ResponseHandler } from "@global/request/response/handler/api/Insert";

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
  const insertHandler = new InsertHandler({
    entity: insertEntity, needsAuthorization: true,
    responseHandler: new ResponseHandler({ successMessage: "Sugestão enviada com sucesso!" })
  });

  const formItems = [
    new Conteudo({ entity: formEntity, fieldName: "conteudo" }),
    new Hidden({ entity: formEntity, name: `${formEntity}_${conteudoName}`, defaultValue: conteudoId, fieldName: conteudoName }),
    new Hidden({ entity: formEntity, name: `${formEntity}_${estudanteName}`, defaultValue: estudanteId, fieldName: estudanteName }),
  ];
  const form = new Form(formItems, "below");

  return <Sugestion formConfig={form} insertHandler={insertHandler} onClose={onClose} open={open} />;
}
