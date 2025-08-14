"use client";

import Structure from "@/component/structure/ReturnTitle";
import styles from "./page.module.css";
import IconFrameContainer from "@/component/atomic/IconFrameContainer";
import { use } from "react";
import { useGetRow } from "@global/hook/request/useGetRow";
import { Viewing } from "@global/component/viewing/Viewing";
import Loading2 from "@global/component/overlay/popup/dialog/Loading2";

export default function page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params);

  //tecnicamente essa listagem é para trazer os ids dos conteudos desse extensivo (os 4 tipos), dai teria que tratar para redirecionar para os conteudos certos
  const { data, loading, error } = useGetRow({
    entity: "extensivos2",
    id: id,
    needsAuthorization: true,
  });

  //pegar o nome extensivo
  const nome = "mock"

  //limpar os ids para redirecionar (passar do json para o array de ids)
  const hotTopics = [1, 2, 3];
  const mapasMentais = [1, 3];
  const flashcards = [9, 10, 11];
  const questoes = [1, 2, 3, 4, 5];

  return (
    <Viewing
      data={data}
      loading={loading}
      error={error}
      loadingComponent={<Loading2 loading />}
      renderItem={(item: any) =>
        <Structure title={item.nome || nome}>
          <div className={styles.container}>
            <IconFrameContainer
              links={[
                { href: `/hot-topics/listagem?filters=hot_topics_id_0{in}${hotTopics.join(",")}`, image: "/project/assets/HotTopics.svg", label: "Hot topics" },
                { href: `/mapas-mentais/listagem?filters=mapas_mentais_id_0{in}${mapasMentais.join(",")}`, image: "/project/assets/MapasMentais.svg", label: "Mapas Mentais" },
                { href: `/flashcards/listagem?filters=flashcards_id_0{in}${flashcards.join(",")}`, image: "/project/assets/Flashcards.svg", label: "Flashcards" },
                { href: `/questoes/listagem?filters=questoes_id_0{in}${questoes.join(",")}`, image: "/project/assets/Questoes.svg", label: "Questões" },
              ]}
            />
          </div>
        </Structure>
      }
    />
  );
}
