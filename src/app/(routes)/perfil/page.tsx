"use client";

import ReturnTitleStructure from "@/component/structure/ReturnTitle";
import { useGetRow } from "@global/hook/request/useGetRow";
import { Estudante as EstudanteType } from "@/type/Entities";
import { useUser } from "@global/hook/auth/useUser";
import Loading2 from "@global/component/overlay/popup/dialog/Loading2";
import Perfil from "@/component/atomic/Perfil";
import { Viewing } from "@global/component/viewing/Viewing";

type Props = {};

export default function page({ }: Props) {
  const { id: userId } = useUser()

  const { data, setData, loading, error } = useGetRow<EstudanteType>({
    entity: "estudantes2",
    id: userId,
    needsAuthorization: true,
  });

  return (
    <ReturnTitleStructure title="Perfil" customClass="perfil">
      <Viewing
        data={data}
        loading={loading}
        error={error}
        emptyComponent={<></>}
        loadingComponent={<Loading2 loading />}
        renderItem={(item) => <Perfil data={item} setData={setData} />}
      />
    </ReturnTitleStructure>
  );
}
