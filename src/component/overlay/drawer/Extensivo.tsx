"use client";

import { diaExtensivo } from "@/type/Entities";
import { BottomDrawer } from "@global/component/overlay/drawer/Bottom"
import Loading2 from "@global/component/overlay/popup/dialog/Loading2";
import { AsyncRenderer } from "@global/component/data/AsyncRenderer";
import { Dispatch, SetStateAction } from "react";
import ExtensivoItem from "./ExtensivoItem";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  data: diaExtensivo[];
  setData: Dispatch<SetStateAction<any[]>>;
  loading: boolean;
}

export default function Extensivo({ open, onClose, title, data, setData, loading }: Props) {
  return (
    <BottomDrawer open={open} title={title} onClose={onClose} >
      <h2 className="subtitle">Recomendação semanal de estudo</h2>
      <div className="filter-items extensivo-week">
        <AsyncRenderer
          data={data}
          loading={loading}
          loadingComponent={<Loading2 loading />}
          renderItem={(item) => (
            <ExtensivoItem data={item} setData={setData} />
          )}
        />
        <div className="footer">
          <p>O Modo Extensivo é um planejamento anual de estudos guiado por um checklist completo, com todos os temas e tarefas essenciais — como simulados, revisões e exercícios — organizados ao longo de 52 semanas.</p>
          <p>Ele foi criado para garantir constância, foco e progresso real até a prova de residência, oferecendo uma trilha clara e estruturada que abrange todo o conteúdo necessário, sem perder tempo com o que não cai.</p>
        </div>
      </div>
    </BottomDrawer>
  )
}