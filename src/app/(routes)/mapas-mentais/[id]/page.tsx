import PdfContentStructure from "@/component/structure/PdfContent";

type HotTopics = {
  hot_topics_nome: string;
  hot_topics_url_conteudo: string;
  hot_topics_salvos_id: string | null;
};

export default async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <PdfContentStructure
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
