import useQuestoes from "@/store/QuestaoStore";
import cls from "clsx/lite";

type Props = {
  tipo: "multiplo" | "verdadeiro" | "imagem";
  conteudo?: string;
  alternativa: "A" | "B" | "C" | "D" | "E";
};

export default function QuestaoAlternativa({ tipo, conteudo, alternativa }: Props) {
  const { getCurrentAnswer, setAnswer } = useQuestoes();

  if (!conteudo || conteudo.trim() === "") {
    return null;
  }

  if (tipo === "imagem") {
    return <div>imagem</div>;
  }

  return (
    <button
      onClick={() => setAnswer(alternativa)}
      disabled={getCurrentAnswer()?.confirmed}
      className={cls(
        tipo,
        !getCurrentAnswer()?.confirmed && getCurrentAnswer()?.answer === alternativa && "ativo",
        getCurrentAnswer()?.confirmed &&
        (alternativa === getCurrentAnswer()?.correct
          ? "correto"
          : alternativa === getCurrentAnswer()?.answer
            ? "incorreto"
            : "")
      )}
    >
      <p className="letra">{alternativa}</p>
      <p className="conteudo">{conteudo}</p>
    </button>
  );
}