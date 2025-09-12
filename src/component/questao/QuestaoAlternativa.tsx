import useQuestoes from "@/store/QuestaoStore";
import UploadImage from "@global/component/atomic/UploadImage";
import cls from "clsx/lite";

type Props = {
  tipo: "questao-multiplo" | "questao-verdadeiro-falso" | "questao-imagem" | "questao-aberta";
  conteudo?: string;
  alternativa: "A" | "B" | "C" | "D" | "E";
};

export default function QuestaoAlternativa({ tipo, conteudo, alternativa }: Props) {
  const { getCurrentAnswer, setAnswer } = useQuestoes();

  if (!conteudo || conteudo.trim() === "") {
    return null;
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
      {
        tipo === "questao-imagem" ? (
          <UploadImage alt={conteudo} src={conteudo} height={300} width={300} />
        ) : (
          <p className="conteudo">{conteudo}</p>
        )
      }
    </button>
  );
}