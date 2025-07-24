"use client";

import ReturnTitleStructure from "@/component/structure/ReturnTitle";
import { useGetRow } from "@global/hook/request/useGetRow";
import { Estudante as EstudanteType } from "@/type/Entities";
import { useUser } from "@global/hook/auth/useUser";
import Loading2 from "@global/component/overlay/popup/dialog/Loading2";
import Perfil from "@/component/atomic/Perfil";

type Props = {};

export default function page({ }: Props) {
  const { id: userId } = useUser()

  const { data, loading } = useGetRow<EstudanteType>({
    entity: "estudantes2",
    id: userId,
    needsAuthorization: true,
  });

  if (loading) return <Loading2 loading />

  return (
    <>
      {data && (
        <ReturnTitleStructure title="Perfil" customClass="perfil">
          <Perfil data={data} />
        </ReturnTitleStructure>
      )}
    </>
  );
}
