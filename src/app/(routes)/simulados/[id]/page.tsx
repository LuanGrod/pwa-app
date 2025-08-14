import SimuladoStats from "./SimuladoStats";

type Props = {}

export default async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <SimuladoStats id={id} />
}