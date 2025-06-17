"use client";

import { useListing } from "@/hook/listing/useListing";
import { Listing } from "./Listing";
import { Item as ListItem } from "@/component/listing/Item";

type Props = {};

type Questao = {
  questoes_salvos_id_questao: string;
  temas_nome: string;
  questoes_enunciado: string;
  areas_url_imagem: string;
};
export default function Questoes({}: Props) {
  const { data, loading, error } = useListing<Questao>({ entity: "questoes-salvos" });
  return (
    <Listing
      data={data}
      loading={loading}
      error={error}
      renderItem={(item, index: number) => (
        <ListItem
          key={item.questoes_salvos_id_questao}
          href={`/questoes/${item.questoes_salvos_id_questao}`}
          imageSrc={`https://sistemasclientes.com.br/projetos/medrqe/uploads/${item.areas_url_imagem}`}
          subtitle={item.questoes_enunciado}
          title={item.temas_nome}
        />
      )}
    />
  );
}
