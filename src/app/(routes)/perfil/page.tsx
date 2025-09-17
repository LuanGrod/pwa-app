"use client";

import Structure from "@/component/structure/ReturnTitle";
import { useGetRow } from "@global/hook/request/useGetRow";
import { Estudante as EstudanteType } from "@/type/Entities";
import { useUser } from "@global/hook/auth/useUser";
import Loading2 from "@global/component/overlay/popup/dialog/Loading2";
import Perfil from "@/component/perfil/Perfil";
import { AsyncRenderer } from "@global/component/data/AsyncRenderer";

type Props = {};

export default function page({ }: Props) {
  const { id: userId } = useUser()

  const { data, setData, loading, error } = useGetRow<EstudanteType>({
    entity: "estudantes2",
    id: userId,
    needsAuthorization: true,
  });

  return (
    <Structure title="Perfil" className="perfil">
      <AsyncRenderer
        data={data}
        loading={loading}
        error={error}
        emptyComponent={<></>}
        loadingComponent={<Loading2 loading />}
        renderItem={(item) => <Perfil data={item} setData={setData} />}
      />
    </Structure>
  );
}
