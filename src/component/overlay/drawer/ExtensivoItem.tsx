import { diaExtensivo } from "@/type/Entities";
import { LinkView } from "@global/component/link/LinkView";
import { useUser } from "@global/hook/auth/useUser";
import useToggleAddRemoveArray from "@global/hook/useToggleAddRemoveArray";
import { data } from "motion/react-client";
import { Dispatch, SetStateAction } from "react";

type Props = {
  data: diaExtensivo;
  setData: Dispatch<SetStateAction<any[]>>;
}

export default function ExtensivoItem({ data, setData }: Props) {
  const { id: userId } = useUser();

  const insertData = {
    "extensivos_estudantes_id_extensivo": data.extensivos_id,
    "extensivos_estudantes_id_estudante": userId,
  };

  const { toggleAddRemove, loading } = useToggleAddRemoveArray({
    data,
    setData,
    entity: "extensivos-estudantes",
    idParamName: "extensivos_estudantes_id",
    keyParamName: "extensivos_id",
    insertData,
  });

  return (
    <div className="custom-checkbox" key={data.extensivos_id}>
      <button disabled={loading} onClick={toggleAddRemove} className={`checkmark ${data.extensivos_estudantes_id ? "checked" : ""}`}></button>
      <LinkView href={`/extensivos/${data.extensivos_id}`}>
        <h3 className="title">{data.extensivos_nome}</h3>
        <p className="day">{data.extensivos_dia_semana}</p>
      </LinkView>
    </div>
  )
}