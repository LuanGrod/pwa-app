import useQuestoes from "@/store/QuestaoStore";

type Props = {
  tipo: "multiplo" | "verdadeiro" | "imagem";
  conteudo?: string;
  alternativa: "A" | "B" | "C" | "D" | "E";
};

export default function QuestaoAlternativa({ tipo, conteudo, alternativa }: Props) {
  const { currentAnswer, setCurrentAnswer } = useQuestoes();

  if (!conteudo || conteudo.trim() === "") {
    return null;
  }

  if (tipo === "imagem") {
    return <div>imagem</div>;
  }

  return (
    <button onClick={(e) => setCurrentAnswer(alternativa)} className={`${tipo} ${currentAnswer === alternativa ? "ativo" : ""}`}>
      <p className="letra">{alternativa}</p>
      <p className="conteudo">{conteudo}</p>
    </button>
  );
}
