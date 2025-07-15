import { create } from "zustand";
import { Questao as QuestaoType } from "@/type/Entities";
import { Insert } from "@/request/builder/Insert";
import { Delete } from "@/request/builder/Delete";

type QuestaoAnswerType = {
  answer: string;
  correct: string;
  confirmed: boolean;
};

type QuestoesStore = {
  questoesList: QuestaoType[] | null;
  questoesAnswers: QuestaoAnswerType[] | null;
  index: number;
  isShowingAnswer: boolean;
  isShowingAlert: boolean;
  setQuestoesList: (questoes: QuestaoType[]) => void;
  getCurrentQuestao: () => QuestaoType | null;
  nextIndex: () => void;
  previousIndex: () => void;
  countQuestoes: () => number;
  setAnswer: (value: string) => void;
  getCurrentAnswer: () => QuestaoAnswerType | null;
  registerAnswer: (userId: string) => Promise<null | void>;
  handleSave: (userId: string) => Promise<null | void>;
  toggleIsShowingAnswer: () => void;
  getCurrentQuestaoSavedStatus: () => boolean;
  toggleAlert: () => void;
};

const useQuestoes = create<QuestoesStore>((set, get) => ({
  questoesList: [],
  questoesAnswers: [],
  index: 0,
  isShowingAnswer: false,
  isShowingAlert: false,
  setQuestoesList: (questoes: QuestaoType[]) => {
    set({
      questoesList: questoes,
      questoesAnswers: questoes.map((questao) => ({
        answer: "",
        correct: questao.questoes_gabarito,
        confirmed: false,
      })),
    });
  },
  setAnswer: (value: string) => {
    const { questoesAnswers, index } = get();

    if (!questoesAnswers || questoesAnswers.length === 0) return;

    set((state: QuestoesStore) => ({
      questoesAnswers:
        state.questoesAnswers &&
        state.questoesAnswers.map((questao, i) =>
          i === index ? { ...questao, answer: value === questao.answer ? "" : value } : questao
        ),
    }));
  },
  getCurrentQuestao: () => {
    const { questoesList, index } = get();
    if (!questoesList || questoesList.length === 0) return null;
    return questoesList[index];
  },
  getCurrentAnswer: () => {
    const { questoesAnswers, index } = get();
    if (!questoesAnswers || questoesAnswers.length === 0) return null;
    return questoesAnswers[index];
  },
  countQuestoes: () => {
    const { questoesList } = get();
    if (!questoesList || questoesList.length === 0) return 0;
    return questoesList.length;
  },
  nextIndex: () => {
    const { questoesList } = get();
    if (!questoesList || questoesList.length === 0) return null;
    set((state: QuestoesStore) => ({
      index:
        state.questoesList && state.index + 1 < state.questoesList.length
          ? state.index + 1
          : state.index,
    }));
  },
  previousIndex: () => {
    set((state) => ({
      index: state.index - 1 < 0 ? 0 : state.index - 1,
    }));
  },
  registerAnswer: async (userId: string) => {
    const {
      getCurrentQuestao,
      getCurrentAnswer,
      toggleIsShowingAnswer,
      questoesList,
      questoesAnswers,
      toggleAlert,
    } = get();
    const currentQuestao = getCurrentQuestao();
    const currentAnswer = getCurrentAnswer();

    if (
      !questoesList ||
      questoesList.length === 0 ||
      !questoesAnswers ||
      questoesAnswers.length === 0 ||
      !currentQuestao ||
      !currentAnswer
    )
      return null;

    const insertData = {
      respostas_questoes_id_estudante: userId,
      respostas_questoes_id_questao: currentQuestao.questoes_id,
      respostas_questoes_alternativa2: currentAnswer.answer,
    };

    if (currentAnswer.answer) {
      set({
        questoesAnswers: questoesAnswers.map((questao, i) =>
          i === get().index ? { ...questao, confirmed: true } : questao
        ),
      });
      toggleIsShowingAnswer();
      toggleAlert();

      if (!currentAnswer.confirmed) {
        const insert = new Insert({
          entity: "respostas-questoes",
          data: insertData,
        });

        const response = await insert.build(true);
      }
    }
  },
  handleSave: async (userId: string) => {
    const { getCurrentQuestao, questoesList } = get();

    if (!questoesList || questoesList.length === 0) return null;

    const currentQuestao = getCurrentQuestao();
    if (!currentQuestao) return null;

    if (currentQuestao.questoes_salvos_id) {
      let tempId = currentQuestao.questoes_salvos_id;

      set((state) => ({
        questoesList:
          state.questoesList &&
          state.questoesList.map((questao) =>
            questao.questoes_id === currentQuestao.questoes_id
              ? { ...questao, questoes_salvos_id: "" }
              : questao
          ),
      }));

      const deleting = new Delete({
        entity: "questoes-salvos",
        id: tempId,
      });

      const response = await deleting.build(true);
    } else {
      set((state) => ({
        questoesList:
          state.questoesList &&
          state.questoesList.map((questao) =>
            questao.questoes_id === currentQuestao.questoes_id
              ? { ...questao, questoes_salvos_id: "response.data.id" }
              : questao
          ),
      }));

      const insertData = {
        ["questoes_salvos_id_questao"]: currentQuestao.questoes_id,
        ["questoes_salvos_id_estudante"]: userId,
      };

      const insert = new Insert({
        entity: "questoes-salvos",
        data: insertData,
      });

      const response = await insert.build(true);

      if (response.success) {
        set((state) => ({
          questoesList:
            state.questoesList &&
            state.questoesList.map((questao) =>
              questao.questoes_id === currentQuestao.questoes_id
                ? { ...questao, questoes_salvos_id: response.data.id || "" }
                : questao
            ),
        }));
      }
    }
  },
  toggleIsShowingAnswer: () => {
    set((state) => ({
      isShowingAnswer: !state.isShowingAnswer,
    }));
  },
  getCurrentQuestaoSavedStatus: () => {
    const { getCurrentQuestao } = get();

    const currentQuestao = getCurrentQuestao();

    if (!currentQuestao) return false;

    return !!currentQuestao.questoes_salvos_id;
  },
  toggleAlert: () => {
    set({ isShowingAlert: true });
    setTimeout(() => {
      set({ isShowingAlert: false });
    }, 1500);
  },
}));

export default useQuestoes;
