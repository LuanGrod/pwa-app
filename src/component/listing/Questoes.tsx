"use client";

import { useListing } from "@/hook/listing/useListing";
import { Listing } from "./Listing";
import { Item as ListItem } from "@/component/listing/Item";
import { div } from "motion/react-client";
import SkeletonGroup from "./SkeletonGroup";

type Props = {};

type Questao = {
  questoes_salvos_id_questao: string;
  temas_nome: string;
  questoes_enunciado: string;
  areas_url_imagem: string;
};
export default function Questoes({}: Props) {
  const { data, loading, error } = useListing<Questao>({ entity: "questoes-salvos", needsAuthorization: true });
  return (
    <Listing
      data={data}
      loading={loading}
      error={error}
      loadingComponent={<SkeletonGroup />}
      renderItem={(item, index) => (
        <ListItem
          key={index}
          href={`/questoes/${item.questoes_salvos_id_questao}`}
          imageSrc={item.areas_url_imagem}
          subtitle={item.questoes_enunciado}
          title={item.temas_nome}
        />
      )}
    />
  );
}
