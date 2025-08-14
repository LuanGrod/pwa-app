import Structure from "@/component/structure/PdfContent";

export default async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <Structure
      entity="mapas-mentais"
      entityId={id}
      titleParamName="mapas_mentais_nome"
      pdfParamName="mapas_mentais_url_conteudo"
      edicaoSugerida={{
        conteudoName: "id_mapa_mental",
        formEntity: "edicoes_sugeridas_mapas_mentais",
        insertEntity: "edicoes-sugeridas-mapas-mentais",
      }}
      ToggleAddRemove={{
        entity: "mapas-mentais-salvos",
        idParamName: "mapas_mentais_salvos_id",
        insertDataIdParamName: "id_mapa_mental",
        insertDataEntityParamName: "mapas_mentais_salvos",
      }}
    />
  );
}
