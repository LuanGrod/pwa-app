import { useUser } from "@global/hook/auth/useUser";
import useToggleStatus from "@global/hook/overlay/useToggleStatus";
import FlashcardSide from "./FlascardSide";
import { Flashcard as FlashcardType } from "@/type/Entities";
import useFlashcards from "@/store/FlashcardStore";

type Props = {
  data: FlashcardType;
  isFlipped: boolean;
  onFlip: () => void;
  customClass?: string;
};

export default function Flashcard({ data, isFlipped, onFlip, customClass = "" }: Props) {
  const { isActive, toggle } = useToggleStatus();
  const { id: userId } = useUser();
  const { getSavedStatus, handleSave, getLogoColor } = useFlashcards();

  return (
    <div className={`flashcard ${isFlipped ? "show-answer" : ""} ${customClass}`} onClick={onFlip}>
      <div className="flashcard-inner">
        <FlashcardSide
          side={"front"}
          logoColor={getLogoColor(data)}
          handleSave={() => handleSave(userId)}
          toggleDialog={toggle}
          status={getSavedStatus()}
          isOpen={isActive}
          userId={userId}
          conteudoId={data.flashcards_id}
          title={data.flashcards_pergunta_titulo}
          text={data.flashcards_pergunta}
          imageUrl={data.flashcards_url_imagem}
        />
        <FlashcardSide
          side={"back"}
          logoColor={getLogoColor(data)}
          handleSave={() => handleSave(userId)}
          toggleDialog={toggle}
          status={getSavedStatus()}
          isOpen={isActive}
          userId={userId}
          conteudoId={data.flashcards_id}
          title={data.flashcards_resposta_titulo}
          text={data.flashcards_resposta}
          imageUrl={data.flashcards_url_imagem}
        />
      </div>
    </div>
  );
}
