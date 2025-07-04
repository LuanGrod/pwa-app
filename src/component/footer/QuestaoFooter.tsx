"use client";

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
        <div>mostrando resposta</div>
      ) : (
        <button onClick={toggleAnswer} className="btn">
          VER RESPOSTA
        </button>
      )}
    </footer>
  );
}
