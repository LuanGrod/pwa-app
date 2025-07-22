"use client";

import ReturnTitleStructure from "@/component/structure/ReturnTitle";
import { useGetRow } from "@global/hook/request/useGetRow";
import { Estudante as EstudanteType } from "@/type/Entities";

type Props = {};

export default function page({}: Props) {

  const { data, loading, error } = useGetRow<EstudanteType>({
    entity: "estudantes",
    needsAuthorization: true,
  });


  return (
    <ReturnTitleStructure title="Perfil">
      <h1>Perfil</h1>
      {JSON.stringify(data)}
    </ReturnTitleStructure>
  );
}
