import Structure from "@/component/structure/PdfContent";

export default async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <Structure
      entity="hot-topics"
      entityId={id}
      titleParamName="hot_topics_nome"
      pdfParamName="hot_topics_url_conteudo"
      edicaoSugerida={{
        conteudoName: "id_hot_topic",
        formEntity: "edicoes_sugeridas_hot_topics",
        insertEntity: "edicoes-sugeridas-hot-topics",
      }}
      ToggleAddRemove={{
        entity: "hot-topics-salvos",
        idParamName: "hot_topics_salvos_id",
        insertDataIdParamName: "id_hot_topic",
        insertDataEntityParamName: "hot_topics_salvos",
      }}
    />
  );
}
