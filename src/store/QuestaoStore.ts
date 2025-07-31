import { create } from "zustand";
import { Questao as QuestaoType } from "@/type/Entities";
import { Insert } from "@global/request/builder/api/Insert";
import { Delete } from "@global/request/builder/api/Delete";

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
  isSaving: boolean;
  examTimer: number;
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
  toggleIsSaving: () => void;
  incrementTimer: () => void;
  decrementTimer: () => void;
  setTimer: (minutes: number) => void;
  getFormattedTimer: () => string;
};

const useQuestoes = create<QuestoesStore>((set, get) => ({
  questoesList: [],
  questoesAnswers: [],
  index: 0,
  isShowingAnswer: false,
  isShowingAlert: false,
  isSaving: false,
  examTimer: 60, // Initial value: 1 hour (60 minutes)
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
      respostas_questoes_id_simulado: "1",
    };

    if (currentAnswer.answer) {
      set({
        questoesAnswers: questoesAnswers.map((questao, i) =>
          i === get().index ? { ...questao, confirmed: true } : questao
        ),
      });
      toggleIsShowingAnswer();

      if (!currentAnswer.confirmed) {
        toggleAlert();

        const insert = new Insert({
          entity: "respostas-questoes",
          body: insertData,
        });

        const response = await insert.build(true);
      }
    }
  },
  handleSave: async (userId: string) => {
    const { getCurrentQuestao, questoesList, toggleIsSaving } = get();
    toggleIsSaving();

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
        body: insertData,
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
    
    toggleIsSaving();
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
  toggleIsSaving: () => {
    set((state) => ({
      isSaving: !state.isSaving,
    }));
  },
  incrementTimer: () => {
    set((state) => ({
      examTimer: state.examTimer < 360 ? state.examTimer + 30 : state.examTimer, // Max 6 hours (360 min)
    }));
  },
  decrementTimer: () => {
    set((state) => ({
      examTimer: state.examTimer > 60 ? state.examTimer - 30 : state.examTimer, // Min 1 hour (60 min)
    }));
  },
  setTimer: (minutes: number) => {
    // Ensure the value is within bounds and is a valid step (30-minute increments)
    const clampedMinutes = Math.max(60, Math.min(360, minutes));
    const steppedMinutes = Math.round(clampedMinutes / 30) * 30;
    set({ examTimer: steppedMinutes });
  },
  getFormattedTimer: () => {
    const { examTimer } = get();
    const hours = Math.floor(examTimer / 60);
    const minutes = examTimer % 60;
    
    if (minutes === 0) {
      return `${hours}h`;
    } else {
      return `${hours}h${minutes}`;
    }
  },
}));

export default useQuestoes;
