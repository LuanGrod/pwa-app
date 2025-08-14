"use client";

import { diaExtensivo } from "@/type/Entities";
import { LinkView } from "@global/component/atomic/LinkView";
import { Listing } from "@global/component/listing/Listing";
import { BottomDrawer } from "@global/component/overlay/drawer/Bottom"
import Loading2 from "@global/component/overlay/popup/dialog/Loading2";
import { Viewing } from "@global/component/viewing/Viewing";
import { useUser } from "@global/hook/auth/useUser";
import { Delete } from "@global/request/builder/api/Delete";
import { Insert } from "@global/request/builder/api/Insert";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  data: diaExtensivo[];
  setData: Dispatch<SetStateAction<diaExtensivo[]>>;
  loading: boolean;
}

export default function Extensivo({ open, onClose, title, data, setData, loading }: Props) {
  const { id: userId } = useUser();
  const [isSaving, setIsSaving] = useState(false);

  //aqui nao deu para usar o useToggleAddRemove por que estamos trabalhando em cima de um array de objetos e nao de um objeto unico
  const handleToggleAddRemove = async (item: diaExtensivo) => {
    setIsSaving(true);

    if (item.extensivos_estudantes_id) {
      setData((prev: diaExtensivo[]) => prev.map(prevItem =>
        prevItem.extensivos_id === item.extensivos_id
          ? { ...prevItem, extensivos_estudantes_id: "" }
          : prevItem
      ));

      const deleting = new Delete({
        entity: "extensivos-estudantes",
        id: item.extensivos_estudantes_id,
      });

      await deleting.build(true);
    } else {

      const insertData = {
        [`extensivos_estudantes_id_extensivo`]: item.extensivos_id,
        [`extensivos_estudantes_id_estudante`]: userId,
      };

      setData((prev: diaExtensivo[]) => prev.map(prevItem =>
        prevItem.extensivos_id === item.extensivos_id
          ? { ...prevItem, extensivos_estudantes_id: "response.data.id" }
          : prevItem
      ));

      const insert = new Insert({
        entity: "extensivos-estudantes",
        body: insertData,
      });

      const response = await insert.build(true);

      setData((prev: diaExtensivo[]) => prev.map(prevItem =>
        prevItem.extensivos_id === item.extensivos_id
          ? { ...prevItem, extensivos_estudantes_id: response.data.id || "" }
          : prevItem
      ));
    }

    setIsSaving(false);
  }

  return (
    <BottomDrawer open={open} title={title} onClose={onClose} >
      <h2 className="subtitle">Recomendação semanal de estudo</h2>
      <div className="filter-items extensivo-week">
        <Viewing
          data={data}
          loading={loading}
          error={null}
          loadingComponent={<Loading2 loading />}
          renderItem={() => (
            <>
              <Listing
                data={data}
                loading={loading}
                error={null}
                loadingComponent={<Loading2 loading />}
                renderItem={(item) => (
                  <div className="custom-checkbox" key={item.extensivos_id}>
                    <button disabled={isSaving} onClick={e => handleToggleAddRemove(item)} className={`checkmark ${item.extensivos_estudantes_id ? "checked" : ""}`}></button>
                    <LinkView href={`/extensivos/${item.extensivos_id}`}>
                      <h3 className="title">{item.extensivos_nome}</h3>
                      <p className="day">{item.extensivos_dia_semana}</p>
                    </LinkView>
                  </div>
                )}
              />
              <div className="footer">
                <p>O Modo Extensivo é um planejamento anual de estudos guiado por um checklist completo, com todos os temas e tarefas essenciais — como simulados, revisões e exercícios — organizados ao longo de 52 semanas.</p>
                <p>Ele foi criado para garantir constância, foco e progresso real até a prova de residência, oferecendo uma trilha clara e estruturada que abrange todo o conteúdo necessário, sem perder tempo com o que não cai.</p>
              </div>
            </>
          )}
        />
      </div>
    </BottomDrawer>
  )
}