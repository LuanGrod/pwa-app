import { useUser } from "@/hook/auth/useUser";
import useDialog from "@/hook/overlay/useDialog";
import FlashcardSide from "./FlascardSide";
import { Flashcard as FlashcardType } from "@/type/Entities";
import useFlashcards from "@/store/FlashcardStore";

type Props = {
  data: FlashcardType;
};

export default function Flashcard({ data }: Props) {
  const { isOpen, toggleDialog } = useDialog();
  const { id: userId } = useUser();
  const { getCurrentFlashcardSavedStatus, handleSave, isShowingAnswer } = useFlashcards();

  const logoColor =
    data.respostas_flashcards_resposta === "Erro"
      ? "#ff1ac6"
      : data.respostas_flashcards_resposta === "Acerto Parcial"
      ? "#ffa800"
      : data.respostas_flashcards_resposta === "Acerto com Segurança"
      ? "#33ff66"
      : data.respostas_flashcards_resposta === "Acerto Fácil"
      ? "#0066ff"
      : undefined;

  return (
    <div className={`flashcard ${isShowingAnswer ? "show-answer" : ""}`}>
      <div className="flashcard-inner">
        <FlashcardSide
          side={"front"}
          logoColor={logoColor}
          handleSave={e => handleSave(userId)}
          toggleDialog={toggleDialog}
          status={getCurrentFlashcardSavedStatus()}
          isOpen={isOpen}
          userId={userId}
          conteudoId={data.flashcards_id}
          title={data.flashcards_pergunta_titulo}
          text={data.flashcards_pergunta}
          imageUrl={data.flashcards_url_imagem}
        />
        <FlashcardSide
          side={"back"}
          logoColor={logoColor}
          handleSave={e => handleSave(userId)}
          toggleDialog={toggleDialog}
          status={getCurrentFlashcardSavedStatus()}
          isOpen={isOpen}
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
