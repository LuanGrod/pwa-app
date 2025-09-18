"use client";

import Structure from "@/component/structure/ReturnTitle";
import IconFrameContainer from "@/component/iconFrame/IconFrameContainer";
import { use } from "react";
import Loading2 from "@global/component/overlay/popup/dialog/Loading2";
import { conteudosExtensivos as conteudosExtensivosType } from "@/type/Entities";
import { useListing } from "@global/hook/request/useListing";
import { AsyncRenderer } from "@global/component/data/AsyncRenderer";

export default function page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params);

  const { data, loading, error } = useListing<conteudosExtensivosType>({
    entity: "extensivos2",
    id,
    needsAuthorization: true,
  });

  return (
    <AsyncRenderer
      data={data.rows}
      loading={loading}
      error={error}
      loadingComponent={<Loading2 loading />}
      renderItem={(item) =>
        <Structure title={item.extensivos_nome}>
          <div className="extensivo-container">
            <IconFrameContainer
              links={[
                { href: `/hot-topics/listagem?filters=hot_topics_id_0{in}${item.hot_topics_extensivos_ids || ""}`, image: "/project/assets/HotTopics.svg", label: "Hot topics" },
                { href: `/mapas-mentais/listagem?filters=mapas_mentais_id_0{in}${item.mapas_mentais_extensivos_ids || ""}`, image: "/project/assets/MapasMentais.svg", label: "Mapas Mentais" },
                { href: `/flashcards/listagem?filters=flashcards_id_0{in}${item.flashcards_extensivos_ids || ""}&redirect=/extensivos/${item.extensivos_id}`, image: "/project/assets/Flashcards.svg", label: "Flashcards" },
                { href: `/questoes/listagem?filters=questoes_id_0{in}${item.questoes_extensivos_ids || ""}&redirect=/extensivos/${item.extensivos_id}`, image: "/project/assets/Questoes.svg", label: "Questões" },
              ]}
            />
          </div>
        </Structure>
      }
    />
  );
}
