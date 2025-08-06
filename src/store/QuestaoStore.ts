import { create } from "zustand";
import { persist, StateStorage, createJSONStorage } from "zustand/middleware";
import { Questao as QuestaoType } from "@/type/Entities";
import { Insert } from "@global/request/builder/api/Insert";
import { Delete } from "@global/request/builder/api/Delete";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { startTransition } from "react";

type QuestaoAnswerType = {
  id: string;
  answer: string;
  correct: string;
  confirmed: boolean;
};

type testType = {
  provas_id: string;
  instituicoes_nome: string;
  provas_ano: string;
  estados_uf: string;
  isParent: boolean;
};

type formattedTypes = "simplified" | "detailed";

type QuestoesStore = {
  _hasHydrated: boolean;
  pack: QuestaoType[] | null;
  answers: QuestaoAnswerType[] | null;
  index: number;
  isShowingAnswer: boolean;
  isShowingAlert: boolean;
  isSaving: boolean;
  examDuration: number;
  user: string | null;
  test?: testType | null;
  testFinished: boolean;
  examStartTime: number | null;
  examEndTime: number | null;
  setPack: (questoes: QuestaoType[]) => void;
  clearAnswers: () => void;
  getCurrent: () => QuestaoType | null;
  setIndex: (index: number) => void;
  nextIndex: () => void;
  previousIndex: () => void;
  count: () => number;
  setAnswer: (value: string) => void;
  getCurrentAnswer: () => QuestaoAnswerType | null;
  registerAnswer: () => Promise<null | void>;
  handleSave: () => Promise<null | void>;
  toggleIsShowingAnswer: () => void;
  getCurrentSavedStatus: () => boolean;
  toggleAlert: () => void;
  toggleIsSaving: () => void;
  setExamDuration: (minutes: number) => void;
  getExamDuration: () => number;
  getRemainingTime: () => number;
  getFormattedRemainingTime: (type?: formattedTypes) => string;
  checkExamTimeout: (router: AppRouterInstance) => boolean;
  finishExam: (router: AppRouterInstance) => Promise<null | void>;
  setHasHydrated: (state: any) => void;
  setUser: (userId: string | null) => void;
  setTest: (test: testType | null) => void;
  setTestFinished: (finished: boolean) => void;
  updateExpiration: (hours: number) => void;
  getElapsedTime: () => number;
  getFormattedElapsedTime: (type?: formattedTypes) => string;
};

// Storage customizado para LocalStorage com expiração automática
const createExamStorage = (expirationHours: number = 24): StateStorage => {
  return {
    getItem: (name: string): string | null => {
      try {
        const item = localStorage.getItem(name);
        if (!item) return null;
        
        const { data, expiresAt } = JSON.parse(item);
        
        // Se expirou, remove automaticamente e retorna null
        if (Date.now() > expiresAt) {
          localStorage.removeItem(name);
          return null;
        }
        
        return data;
      } catch (error) {
        // Se houve erro no parse, remove o item corrompido
        localStorage.removeItem(name);
        return null;
      }
    },
    setItem: (name: string, value: string): void => {
      try {
        const expiresAt = Date.now() + (expirationHours * 60 * 60 * 1000);
        const item = {
          data: value,
          expiresAt
        };
        localStorage.setItem(name, JSON.stringify(item));
      } catch (error) {
        console.error("Erro ao salvar dados do exame:", error);
      }
    },
    removeItem: (name: string): void => {
      localStorage.removeItem(name);
    },
  };
};

// Instância global do storage de exame (pode ser reconfigurada)
let examStorage = createExamStorage(10); // 10 horas - margem para prova de 6h máx

const useQuestoes = create<QuestoesStore>()(
  persist(
    (set, get) => ({
      _hasHydrated: false,
      pack: [],
      answers: [],
      index: 0,
      isShowingAnswer: false,
      isShowingAlert: false,
      isSaving: false,
      examDuration: 60, // Padrão: 1 hora (60 minutos)
      user: null,
      test: null,
      testFinished: false,
      examStartTime: null,
      examEndTime: null,
      setPack: (questoes: QuestaoType[]) => {
        const { answers: currentAnswers } = get();

        // Se não há respostas, cria tudo do zero
        if (!currentAnswers || currentAnswers.length === 0) {
          const newAnswers = questoes.map((questao) => ({
            id: questao.questoes_id,
            answer: "",
            correct: questao.questoes_gabarito,
            confirmed: false,
          }));

          set({
            pack: questoes,
            answers: newAnswers,
            index: 0,
            isShowingAnswer: false,
            examStartTime: Date.now(), // Inicia o cronômetro da prova
            examEndTime: null, // Reseta o fim se houver
          });
          return;
        }

        // Se já tem respostas, apenas atualiza o pack (não reinicia cronômetro)
        set({
          pack: questoes,
        });
      },
      clearAnswers: () => {
        set({
          answers: [],
          examStartTime: null,
          examEndTime: null,
        });
      },
      setAnswer: (value: string) => {
        const { answers, index } = get();

        if (!answers || answers.length === 0) return;

        set((state: QuestoesStore) => ({
          answers:
            state.answers &&
            state.answers.map((questao, i) =>
              i === index ? { ...questao, answer: value === questao.answer ? "" : value } : questao
            ),
        }));
      },
      getCurrent: () => {
        const { pack, index } = get();
        if (!pack || pack.length === 0) return null;
        return pack[index];
      },
      getCurrentAnswer: () => {
        const { answers, index } = get();
        if (!answers || answers.length === 0) return null;
        return answers[index];
      },
      count: () => {
        const { pack } = get();
        if (!pack || pack.length === 0) return 0;
        return pack.length;
      },
      setIndex: (index: number) => {
        const { pack } = get();
        if (!pack || pack.length === 0) return;
        set({ index: Math.max(0, Math.min(index, pack.length - 1)) });
      },
      nextIndex: () => {
        const { pack } = get();
        if (!pack || pack.length === 0) return null;
        set((state: QuestoesStore) => ({
          index: state.pack && state.index + 1 < state.pack.length ? state.index + 1 : state.index,
        }));
      },
      previousIndex: () => {
        set((state) => ({
          index: state.index - 1 < 0 ? 0 : state.index - 1,
        }));
      },
      registerAnswer: async () => {
        const {
          getCurrent,
          getCurrentAnswer,
          toggleIsShowingAnswer,
          pack,
          answers,
          toggleAlert,
          user,
        } = get();
        const currentQuestao = getCurrent();
        const currentAnswer = getCurrentAnswer();

        if (
          !pack ||
          pack.length === 0 ||
          !answers ||
          answers.length === 0 ||
          !currentQuestao ||
          !currentAnswer
        )
          return null;

        const insertData = {
          respostas_questoes_id_estudante: user,
          respostas_questoes_id_questao: currentQuestao.questoes_id,
          respostas_questoes_alternativa2: currentAnswer.answer,
          respostas_questoes_id_simulado: "1",
        };

        if (currentAnswer.answer) {
          set({
            answers: answers.map((questao, i) =>
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
      handleSave: async () => {
        const { getCurrent, pack, toggleIsSaving, user } = get();
        toggleIsSaving();

        if (!pack || pack.length === 0) return null;

        const currentQuestao = getCurrent();
        if (!currentQuestao) return null;

        if (currentQuestao.questoes_salvos_id) {
          let tempId = currentQuestao.questoes_salvos_id;

          set((state) => ({
            pack:
              state.pack &&
              state.pack.map((questao) =>
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
            pack:
              state.pack &&
              state.pack.map((questao) =>
                questao.questoes_id === currentQuestao.questoes_id
                  ? { ...questao, questoes_salvos_id: "response.data.id" }
                  : questao
              ),
          }));

          const insertData = {
            ["questoes_salvos_id_questao"]: currentQuestao.questoes_id,
            ["questoes_salvos_id_estudante"]: user,
          };

          const insert = new Insert({
            entity: "questoes-salvos",
            body: insertData,
          });

          const response = await insert.build(true);

          if (response.success) {
            set((state) => ({
              pack:
                state.pack &&
                state.pack.map((questao) =>
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
      getCurrentSavedStatus: () => {
        const { getCurrent } = get();

        const currentQuestao = getCurrent();

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
      setExamDuration: (minutes: number) => {
        // Garante que o valor está dentro dos limites e em incrementos de 30 min
        const clampedMinutes = Math.max(60, Math.min(360, minutes));
        const steppedMinutes = Math.round(clampedMinutes / 30) * 30;
        set({ examDuration: steppedMinutes });
      },
      getExamDuration: () => {
        return get().examDuration;
      },
      getRemainingTime: () => {
        const { examStartTime, examDuration, examEndTime } = get();
        
        if (!examStartTime) return examDuration; // Se não começou, retorna duração total
        if (examEndTime) return 0; // Se terminou, retorna 0
        
        const elapsedMs = Date.now() - examStartTime;
        const elapsedMinutes = Math.floor(elapsedMs / 60000);
        const remainingMinutes = examDuration - elapsedMinutes;
        
        return Math.max(0, remainingMinutes); // Não pode ser negativo
      },
      getFormattedRemainingTime: (type: formattedTypes = "simplified") => {
        const remainingMinutes = get().getRemainingTime();
        const hours = Math.floor(remainingMinutes / 60);
        const minutes = remainingMinutes % 60;

        if (type === "simplified") {
          if (minutes === 0) {
            return `${hours}hr`;
          } else {
            return `${hours}hr${minutes}`;
          }
        } else {
          return `${hours ? `${hours} ${hours > 1 ? "horas" : "hora"}` : ""} ${
            hours && minutes ? "e" : ""
          } ${minutes ? `${minutes} min` : ""}`;
        }
      },
      checkExamTimeout: (router: AppRouterInstance) => {
        const remainingTime = get().getRemainingTime();
        
        // Se o tempo acabou, finaliza automaticamente
        if (remainingTime <= 0) {
          get().finishExam(router);
          return true; // Indica que o exame foi finalizado
        }
        
        return false; // Exame ainda está em andamento
      },
      finishExam: async (router: AppRouterInstance) => {
        const { user, test, answers, setTestFinished } = get();

        // Marca o fim da prova ANTES de finalizar
        set({ examEndTime: Date.now() });
        setTestFinished(true);

        if (!answers || !user || !test) {
          alert("Dados incompletos para finalizar o exame");
          return Promise.resolve(null);
        }

        // Filtra apenas as respostas que foram preenchidas (answer não vazio)
        const answeredQuestions = answers.filter((answer) => answer.answer.trim() !== "");

        // Monta o objeto no formato solicitado
        const examData: Record<string, string> = {
          simulados_id_prova: test.provas_id,
        };

        // Adiciona cada resposta preenchida com numeração sequencial
        answeredQuestions.forEach((answer, index) => {
          examData[`respostas_questoes_id_estudante_${index}`] = user;
          examData[`respostas_questoes_id_questao_${index}`] = answer.id;
          examData[`respostas_questoes_id_simulado_${index}`] = "";
          examData[`respostas_questoes_alternativa_${index}`] = answer.answer;
        });

        const insert = new Insert({
          entity: "simulados",
          body: examData,
        });

        const response = await insert.build(true);

        if (response.success) {
          set((state) => ({
            answers: state.answers
              ? state.answers.map((answer) => ({ ...answer, confirmed: true }))
              : [],
          }));

          startTransition(() => {
            router.push("/simulado/gabarito");
          });
        }
      },
      setTestFinished: (finished: boolean) => {
        set({ testFinished: finished });
      },
      setHasHydrated: (state) => {
        set({
          _hasHydrated: state,
        });
      },
      setUser: (userId: string | null) => {
        set({
          user: userId,
        });
      },
      setTest: (test: testType | null) => {
        const { test: currentTest } = get();

        // Se mudou de prova, reseta as respostas
        if (currentTest && test && currentTest.provas_id !== test.provas_id) {
          set({
            test: test,
            answers: [],
            index: 0,
            isShowingAnswer: false,
            isShowingAlert: false,
            examStartTime: null,
            examEndTime: null,
          });
        } else {
          set({
            test: test,
          });
        }
      },
      getElapsedTime: () => {
        const { examStartTime, examEndTime } = get();
        
        if (!examStartTime) return 0;
        
        const endTime = examEndTime || Date.now(); // Se não finalizou, usa tempo atual
        const elapsedMs = endTime - examStartTime;
        const elapsedMinutes = Math.floor(elapsedMs / 60000); // Converte para minutos
        
        return Math.max(0, elapsedMinutes); // Garante que não seja negativo
      },
      getFormattedElapsedTime: (type: formattedTypes = "simplified") => {
        const elapsedMinutes = get().getElapsedTime();
        const hours = Math.floor(elapsedMinutes / 60);
        const minutes = elapsedMinutes % 60;

        if (type === "simplified") {
          if (hours === 0) {
            return `${minutes}min`;
          } else if (minutes === 0) {
            return `${hours}hr`;
          } else {
            return `${hours}hr${minutes}`;
          }
        } else {
          return `${hours ? `${hours} ${hours > 1 ? "horas" : "hora"}` : ""} ${
            hours && minutes ? "e" : ""
          } ${minutes ? `${minutes} min` : ""}`;
        }
      },
      updateExpiration: (hours: number) => {
        // Recria o storage com nova expiração
        examStorage = createExamStorage(hours);
        // Re-salva os dados com nova expiração
        const currentData = get();
        set({ 
          answers: currentData.answers,
          examDuration: currentData.examDuration,
          user: currentData.user,
          test: currentData.test,
          testFinished: currentData.testFinished
        });
      },
    }),
    {
      name: "questoes-storage",
      storage: createJSONStorage(() => examStorage),
      partialize: (state) => ({
        answers: state.answers,
        index: state.index,
        examDuration: state.examDuration,
        user: state.user,
        test: state.test,
        testFinished: state.testFinished,
        examStartTime: state.examStartTime,
        examEndTime: state.examEndTime,
      }),
      onRehydrateStorage: (state) => {
        return () => state.setHasHydrated(true);
      },
    }
  )
);

export default useQuestoes;
