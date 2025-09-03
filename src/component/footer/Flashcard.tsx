"use client";

import useFlashcards from "@/store/FlashcardStore";
import RespostaBtn from "./RespostaBtn";
import { useUser } from "@global/hook/auth/useUser";
import { useRouter } from "next/navigation";

type Props = {
  isFlipped: boolean;
  setIsFlipped: (value: boolean) => void;
  isSlidding: boolean;
  setIsSlidding: (value: boolean) => void;
  title: string;
};

export default function Flashcard({ isFlipped, setIsFlipped, isSlidding, setIsSlidding }: Props) {
  const { id: userId } = useUser();

  const { registerAnswer, fetchNextFlashcard, next } = useFlashcards();

  const router = useRouter();

  const handleVerResposta = async () => {
    setIsFlipped(true);
    await fetchNextFlashcard();
  };

  const handleRegisterAnswer = (value: string) => {
    if (isSlidding) return;

    setIsSlidding(true);

    if (next) setIsFlipped(false);
    
    setTimeout(() => {
      registerAnswer(userId, value, router);
      setIsSlidding(false);
    }, 1200)
  }

  return (
    <footer className="flashcard-footer">
      {isFlipped ? (
        <div className="respostas-wrapper">
          <RespostaBtn onClick={() => handleRegisterAnswer("Erro")} color="#FF1AC6" title="Erro" value="Erro" />
          <RespostaBtn onClick={() => handleRegisterAnswer("Acerto Parcial")} color="#FFA800" title="Acerto parcial" value="Acerto Parcial" />
          <RespostaBtn onClick={() => handleRegisterAnswer("Acerto com Segurança")} color="#33FF66" title="Acerto seguro" value="Acerto com Segurança" />
          <RespostaBtn onClick={() => handleRegisterAnswer("Acerto Fácil")} color="#0066FF" title="Fácil" value="Acerto Fácil" />
        </div>
      ) : (
        <button onClick={handleVerResposta} disabled={isSlidding} className="btn">
          VER RESPOSTA
        </button>
      )}
    </footer>
  );
}
