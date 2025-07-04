import { useUser } from "@/hook/auth/useUser";
import useDialog from "@/hook/overlay/useDialog";
import useToggleAddRemove from "@/hook/useToggleAddRemove";
import { Dispatch } from "react";
import FlashcardSide from "./FlascardSide";
import { Flashcard as FlashcardType } from "@/type/Entities";

type Props = {
  data: FlashcardType;
  setData: Dispatch<any>;
  showingAnswer?: boolean;
};

export default function Flashcard({ data, setData, showingAnswer }: Props) {
  const { isOpen, toggleDialog } = useDialog({});
  const { id: userId } = useUser();

  const insertData = {
    ["flashcards_salvos_id_flashcard"]: data.flashcards_id,
    ["flashcards_salvos_id_estudante"]: userId,
  };

  const { toggleAddRemove } = useToggleAddRemove({
    data,
    entity: "flashcards-salvos",
    idParamName: "flashcards_salvos_id",
    insertData,
    setData,
  });

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
    <div className={`flashcard ${showingAnswer ? "show-answer" : ""}`}>
      <div className="flashcard-inner">
        <FlashcardSide
          side={"front"}
          logoColor={logoColor}
          handleSave={toggleAddRemove}
          toggleDialog={toggleDialog}
          status={!!data.flashcards_salvos_id}
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
          handleSave={toggleAddRemove}
          toggleDialog={toggleDialog}
          status={!!data.flashcards_salvos_id}
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
