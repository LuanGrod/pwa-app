"use client";

type Props = {
  flashcardId: string;
  showAnswer: boolean;
  toggleAnswer: () => void;
  handleNext: () => void;
};

export default function QuestaoFooter({ flashcardId, showAnswer, toggleAnswer, handleNext }: Props) {
  const handleNextClick = () => {
    handleNext();
    toggleAnswer();
  };

  return (

  );
}
