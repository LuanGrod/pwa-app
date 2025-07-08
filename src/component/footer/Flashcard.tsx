"use client";

import useFlashcards from "@/store/FlashcardStore";
import RespostaBtn from "./RespostaBtn";

type Props = {};

export default function Flashcard({}: Props) {

  const { isShowingAnswer, toggleIsShowingAnswer } = useFlashcards();

  return (
    <footer className="flashcard-footer">
      {isShowingAnswer ? (
        <div className="respostas-wrapper">
          <RespostaBtn color="#FF1AC6" title="Erro" value="Erro" />
          <RespostaBtn color="#FFA800" title="Acerto parcial" value="Acerto Parcial" />
          <RespostaBtn color="#33FF66" title="Acerto seguro" value="Acerto com Segurança" />
          <RespostaBtn color="#0066FF" title="Fácil" value="Acerto Fácil" />
        </div>
      ) : (
        <button onClick={toggleIsShowingAnswer} className="btn">
          VER RESPOSTA
        </button>
      )}
    </footer>
  );
}
