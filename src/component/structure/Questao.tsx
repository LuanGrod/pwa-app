import { Dispatch, ReactNode } from "react";
import Header from "@global/header/Questao";
import QuestaoFooter from "../footer/QuestaoFooter";
import { useUser } from "@/hook/auth/useUser";
import useDialog from "@/hook/overlay/useDialog";
import useToggleAddRemove from "@/hook/useToggleAddRemove";
import { useToggle } from "@/hook/useToggle";
import EdicaoSugerida from "../overlay/popup/dialog/EdicaoSugerida";
import { Questao as QuestaoType } from "@/type/Entities";

type Props = {
  data: QuestaoType;
  setData: Dispatch<any>;
  children: ReactNode;
  questaoId: string;
  handleNext: () => void;
  elementsIds?: string[];
};

export default function Questao({ data, setData, children, questaoId, handleNext, elementsIds }: Props) {
  const { isOpen, toggleDialog } = useDialog({});
  const { id: userId } = useUser();
  const { status, toggle } = useToggle();

  const insertData = {
    ["questoes_salvos_id_questao"]: questaoId,
    ["questoes_salvos_id_estudante"]: userId,
  };

  const { toggleAddRemove } = useToggleAddRemove({
    data,
    entity: "questoes-salvos",
    idParamName: "questoes_salvos_id",
    insertData,
    setData,
  });

  return (
    <>
      <Header status={false} elementsIds={elementsIds} handleSave={toggleAddRemove} handleAddSugestion={toggleDialog} />
      <main className="content-wrapper questoes">
        {children}
        {isOpen && (
          <EdicaoSugerida
            onClose={toggleDialog}
            open={isOpen}
            estudanteId={userId}
            conteudoId={questaoId}
            conteudoName="id_questao"
            formEntity="edicoes_sugeridas_questoes"
            insertEntity="edicoes-sugeridas-questoes"
          />
        )}
      </main>
      <QuestaoFooter showAnswer={status} toggleAnswer={toggle} flashcardId={questaoId} handleNext={handleNext} />
    </>
  );
}
