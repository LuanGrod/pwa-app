"use client";

import RespostaBtn from "./RespostaBtn";

type Props = {
  flashcardId: string;
  showAnswer: boolean;
  toggleAnswer: () => void;
  handleNext: () => void;
};

export default function FlashcardFooter({ flashcardId, showAnswer, toggleAnswer, handleNext }: Props) {
  const handleNextClick = () => {
    handleNext();
    toggleAnswer();
  };

  return (
    <footer className="flashcard-footer">
      {showAnswer ? (
        <div className="respostas-wrapper">
          <RespostaBtn toggle={handleNextClick} value="Erro" flashcardId={flashcardId} title="Erro" color="#FF1AC6" />
          <RespostaBtn
            toggle={handleNextClick}
            value="Acerto Parcial"
            flashcardId={flashcardId}
            title="Acerto parcial"
            color="#FFA800"
          />
          <RespostaBtn
            toggle={handleNextClick}
            value="Acerto com Segurança"
            flashcardId={flashcardId}
            title="Acerto seguro"
            color="#33FF66"
          />
          <RespostaBtn
            toggle={handleNextClick}
            value="Acerto Fácil"
            flashcardId={flashcardId}
            title="Fácil"
            color="#0066FF"
          />
        </div>
      ) : (
        <button onClick={toggleAnswer} className="btn">
          VER RESPOSTA
        </button>
      )}
    </footer>
  );
}
