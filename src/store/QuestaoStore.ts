import { Questao as QuestaoType } from "@/type/Entities";
import { Delete } from "@global/request/builder/api/Delete";
import { Insert } from "@global/request/builder/api/Insert";
import { formattedTypes } from "@global/type/ElapsedFormat";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { startTransition } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createLocalStorageStore } from "./localStorageStore";

export type QuestaoAnswerType = {
  id: string;
  answer: string;
  correct: string;
  confirmed: boolean;
  area: string;
  ordem: string;
};

export type QuestionTypes =
  | "questao-multiplo"
  | "questao-verdadeiro-falso"
  | "questao-imagem"
  | "questao-aberta";

type testType = {
  provas_id: string;
  instituicoes_nome: string;
  provas_ano: string;
  estados_uf: string;
  isParent: boolean;
};

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
  saveExam: (router: AppRouterInstance) => Promise<null | void>;
  setHasHydrated: (state: any) => void;
  setUser: (userId: string | null) => void;
  setTest: (test: testType | null) => void;
  updateExpiration: (hours: number) => void;
  getElapsedTime: () => number;
  getFormattedTime: (type?: formattedTypes) => string;
  getGeneralStatistics: () => {
    totalQuestions: number;
    correctAnswers: number;
    incorrectAnswers: number;
    unansweredQuestions: number;
    answeredQuestions: number;
    correctPercentageOverRespondedQuestions: number;
  };
  getAccuracyByArea: () => Array<{
    area: string;
    accuracy: number; // Porcentagem de acerto (0-100)
  }>;
  getQuestionType: (questao?: QuestaoType) => QuestionTypes;
};

let examStorage = createLocalStorageStore(10);

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
      examDuration: 60,
      user: null,
      test: null,
      examStartTime: null,
      examEndTime: null,
      setPack: (questoes: QuestaoType[]) => {
        const { answers: currentAnswers } = get();

        // Se não tem respostas, inicializa com valores vazios
        if (!currentAnswers || currentAnswers.length === 0) {
          const newAnswers: QuestaoAnswerType[] = questoes.map((questao) => ({
            id: questao.questoes_id,
            answer: "",
            correct: questao.questoes_gabarito,
            confirmed: false,
            area: questao.areas_nome,
            ordem: questao.questoes_ordem,
          }));

          set({
            pack: questoes,
            answers: newAnswers,
            index: 0,
            isShowingAnswer: false,
            examStartTime: Date.now(),
            examEndTime: null,
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
          test: null,
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
          getQuestionType,
          user,
        } = get();
        const currentQuestao = getCurrent();
        const currentAnswer = getCurrentAnswer();
        const tipo = getQuestionType();

        if (tipo === "questao-aberta" && currentAnswer) {
          currentAnswer.answer = currentAnswer.correct;
        }

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
          respostas_questoes_alternativa: currentAnswer.answer,
        };

        if (currentAnswer.answer) {
          set({
            answers: answers.map((questao, i) =>
              i === get().index ? { ...questao, confirmed: true } : questao
            ),
          });
          toggleIsShowingAnswer();

          if (!currentAnswer.confirmed) {
            //eu coloquei um delay por causa da demora na atualização do estado da resposta (205) quando a questão é aberta
            setTimeout(() => {
              toggleAlert();
            }, 100);

            const insert = new Insert({
              entity: "respostas-questoes2",
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
        const { pack, answers, getQuestionType } = get();

        let newAnswers = answers;

        pack?.map((questao, index) => {
          if (newAnswers && getQuestionType(questao) === "questao-aberta") {
            newAnswers[index].answer = newAnswers[index].correct;
          }
        });

        set({ examEndTime: Date.now(), isSaving: false, answers: newAnswers });

        startTransition(() => {
          router.push("/simulados/gabarito");
        });
      },
      saveExam: async (router: AppRouterInstance) => {
        const { user, test, answers, toggleIsSaving, clearAnswers, getElapsedTime } = get();
        toggleIsSaving();

        if (!answers || !user || !test) {
          return Promise.resolve(null);
        }

        // Filtra apenas as respostas que foram preenchidas (answer não vazio)
        const answeredQuestions = answers.filter((answer) => answer.answer.trim() !== "");

        // Monta o objeto no formato solicitado
        const examData: Record<string, string> = {
          simulados_id_prova: test.provas_id,
          simulados_duracao: getElapsedTime().toString(),
        };

        // Adiciona cada resposta preenchida com numeração sequencial
        answers.forEach((answer, index) => {
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
          startTransition(() => {
            router.push("/");
          });
          clearAnswers();
        }
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
      getFormattedTime: (type: formattedTypes = "simplified") => {
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
          if (hours === 0 && minutes === 0) {
            return "0 min";
          }

          return `${hours ? `${hours} ${hours > 1 ? "horas" : "hora"}` : ""} ${
            hours && minutes ? "e" : ""
          } ${minutes ? `${minutes} min` : ""}`;
        }
      },
      updateExpiration: (hours: number) => {
        // Recria o storage com nova expiração
        examStorage = createLocalStorageStore(hours);
        // Re-salva os dados com nova expiração
        const currentData = get();
        set({
          answers: currentData.answers,
          examDuration: currentData.examDuration,
          user: currentData.user,
          test: currentData.test,
        });
      },
      getGeneralStatistics: () => {
        const { answers } = get();

        if (!answers || answers.length === 0) {
          return {
            totalQuestions: 0,
            correctAnswers: 0,
            incorrectAnswers: 0,
            unansweredQuestions: 0,
            answeredQuestions: 0,
            correctPercentageOverRespondedQuestions: 0,
          };
        }

        const totalQuestions = answers.length;
        const correctAnswers = answers.filter((answer) => answer.answer === answer.correct).length;
        const incorrectAnswers = answers.filter(
          (answer) => answer.answer && answer.answer !== answer.correct
        ).length;
        const answeredQuestions = answers.filter((answer) => answer.answer).length;
        const unansweredQuestions = totalQuestions - answeredQuestions;
        const correctPercentageOverRespondedQuestions =
          answeredQuestions > 0 ? Math.round((correctAnswers / answeredQuestions) * 100) : 0;

        return {
          totalQuestions,
          correctAnswers,
          incorrectAnswers,
          unansweredQuestions,
          answeredQuestions,
          correctPercentageOverRespondedQuestions,
        };
      },
      getAccuracyByArea: () => {
        const { answers } = get();

        if (!answers || answers.length === 0) {
          return [];
        }

        // Agrupa as questões por área para calcular apenas a porcentagem
        const areaGroups = answers.reduce((groups, answer) => {
          const { area } = answer;
          if (!groups[area]) {
            groups[area] = {
              total: 0,
              correct: 0,
            };
          }
          groups[area].total++;
          if (answer.answer === answer.correct) {
            groups[area].correct++;
          }
          return groups;
        }, {} as Record<string, { total: number; correct: number }>);

        // Calcula apenas a porcentagem de acerto por área
        return Object.entries(areaGroups)
          .map(([area, stats]) => {
            const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;

            return {
              area,
              accuracy,
            };
          })
          .sort((a, b) => a.area.localeCompare(b.area)); // Ordena alfabeticamente
      },
      getQuestionType: (questao?: QuestaoType) => {
        const { getCurrent } = get();

        const data = questao || getCurrent();

        if (!data) return "questao-multiplo";

        const alternativas = [
          data.questoes_alternativa_a || data.questoes_alternativa_a_url_imagem,
          data.questoes_alternativa_b || data.questoes_alternativa_b_url_imagem,
          data.questoes_alternativa_c || data.questoes_alternativa_c_url_imagem,
          data.questoes_alternativa_d || data.questoes_alternativa_d_url_imagem,
          data.questoes_alternativa_e || data.questoes_alternativa_e_url_imagem,
        ];

        const imageExtensions = [".jpg", ".png", ".jpeg"];

        const qtdAlternativas = alternativas.filter((item) => item && item.trim() !== "").length;

        const imagemAlternativa = alternativas.some(
          (item) =>
            item &&
            item.trim() !== "" &&
            imageExtensions.some((ext) => item.toLowerCase().endsWith(ext))
        );

        return imagemAlternativa
          ? "questao-imagem"
          : qtdAlternativas === 1
          ? "questao-aberta"
          : qtdAlternativas === 2
          ? "questao-verdadeiro-falso"
          : "questao-multiplo";
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
