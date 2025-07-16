
import FlashcardItem from "./FlashcardItem";

export default async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <FlashcardItem id={id} />
  );
}
