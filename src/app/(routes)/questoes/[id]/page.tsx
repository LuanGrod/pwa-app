
import QuestaoItem from "./QuestaoItem";

export default async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <QuestaoItem id={id} />
  );
}
