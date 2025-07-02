"use client";

import { useListing } from "@/hook/request/useListing";
import { Item as ListItem } from "@/component/listing/Item";
import SkeletonGroup from "./SkeletonGroup";
import { Listing } from "./Listing";
import Loading2 from "@global/overlay/popup/dialog/Loading2";

type Props = {};

type Questao = {
  questoes_salvos_id_questao: string;
  temas_nome: string;
  questoes_enunciado: string;
  areas_url_imagem: string;
};

export default function Questoes2({}: Props) {
  const { data, loading, error } = useListing<Questao>({ entity: "questoes-salvos", needsAuthorization: true });
  return (
    <Listing<Questao>
      data={data}
      loading={loading}
      error={error}
      loadingComponent={<Loading2 loading={loading} />}
      renderItem={(item) => (
        <ListItem
          href={`/questoes/${item.questoes_salvos_id_questao}`}
          imageSrc={item.areas_url_imagem}
          subtitle={item.questoes_enunciado}
          title={item.temas_nome}
        />
      )}
    />
  );
}
