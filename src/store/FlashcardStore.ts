import { Flashcard as FlashcardType } from "@/type/Entities";
import { Delete } from "@global/request/builder/api/Delete";
import { Insert } from "@global/request/builder/api/Insert";
import { Post } from "@global/request/builder/api/Post";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { startTransition } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createLocalStorageStore } from "../../global/store/localStorageStore";

type FlashcardAnswerEntry = {
  flashcardId: string;
  answer: string;
};

type FlashcardStore = {
  _hasHydrated: boolean;
  current: FlashcardType | null;
  next: FlashcardType | null;
  temas: number[];
  sessaoId: number | null;
  currentThemeIndex: number;
  answers: FlashcardAnswerEntry[];
  isShowingAnswer: boolean;
  isSaving: boolean;
  initializeSession: (data: {
    temas: number[];
    sessao_id: number;
    flashcard: FlashcardType;
  }) => void;
  clearSession: () => void;
  fetchNextFlashcard: () => Promise<void>;
  getCurrentThemeId: () => number | null;
  getNextThemeIndex: () => number | null;
  setCurrent: (flashcard: FlashcardType) => void;
  setNext: (flashcard: FlashcardType) => void;
  handleSave: (userId: string) => Promise<null | undefined>;
  getSavedStatus: (flashcard?: FlashcardType) => boolean;
  toggleIsShowingAnswer: () => void;
  registerAnswer: (
    userId: string,
    value: string,
    router: AppRouterInstance
  ) => Promise<null | void>;
  toggleIsSaving: () => void;
  getLogoColor: (flashcard?: FlashcardType) => string | undefined;
  setHasHydrated: (state: any) => void;
};

let flashcardStore = createLocalStorageStore(10);

const useFlashcards = create<FlashcardStore>()(
  persist(
    (set, get) => ({
      _hasHydrated: false,
      current: null,
      next: null,
      temas: [],
      sessaoId: null,
      currentThemeIndex: 0,
      answers: [],
      isShowingAnswer: false,
      isSaving: false,

      initializeSession: (data: {
        temas: number[];
        sessao_id: number;
        flashcard: FlashcardType;
      }) => {
        set({
          temas: data.temas,
          sessaoId: data.sessao_id,
          current: data.flashcard,
          currentThemeIndex: data.temas.findIndex(
            (tema) => tema === data.flashcard.flashcards_id_tema
          ),
          answers: [],
        });
      },
      clearSession: () => {
        set({
          answers: [],
          current: null,
          next: null,
          temas: [],
          sessaoId: null,
          currentThemeIndex: 0,
        });
      },
      fetchNextFlashcard: async () => {
        const { currentThemeIndex, getNextThemeIndex, sessaoId, temas } = get();
        const nextThemeIndex = getNextThemeIndex();

        if (!sessaoId) return;

        const proximoFlashcard = new Post({
          entity: "proximo-flashcard",
          body: {
            tema_id: temas[nextThemeIndex!],
            sessao_id: sessaoId,
          },
        });

        const response = await proximoFlashcard.build(true);

        set((state) => ({
          next: response.flashcard,
        }));
      },
      getCurrentThemeId: () => {
        const { current } = get();
        return current?.flashcards_id_tema || null;
      },
      getNextThemeIndex: () => {
        const { temas, currentThemeIndex } = get();
        if (temas.length === 0) return null;
        const nextIndex = (currentThemeIndex + 1) % temas.length;
        return nextIndex;
      },
      setCurrent: (flashcard: FlashcardType) => {
        set({ current: flashcard });
      },
      setNext: (flashcard: FlashcardType) => {
        set({ next: flashcard });
      },
      handleSave: async (userId: string) => {
        const { current, toggleIsSaving } = get();

        toggleIsSaving();

        if (!current) return null;

        if (current.flashcards_salvos_id) {
          let tempId = current.flashcards_salvos_id;

          set((state) => ({
            current: state.current ? { ...state.current, flashcards_salvos_id: "" } : null,
          }));

          const deleting = new Delete({
            entity: "flashcards-salvos",
            id: tempId,
          });
          await deleting.build(true);
        } else {
          set((state) => ({
            current: state.current
              ? { ...state.current, flashcards_salvos_id: "response.data.id" }
              : null,
          }));

          const insertData = {
            ["flashcards_salvos_id_flashcard"]: current.flashcards_id,
            ["flashcards_salvos_id_estudante"]: userId,
          };

          const insert = new Insert({
            entity: "flashcards-salvos",
            body: insertData,
          });

          const response = await insert.build(true);

          if (response.success) {
            set((state) => ({
              current: state.current
                ? {
                    ...state.current,
                    flashcards_salvos_id: response.data.id || "",
                  }
                : null,
            }));
          }
        }
        toggleIsSaving();
      },
      getSavedStatus: (flashcard?: FlashcardType) => {
        const { current } = get();
        const currentFlashcard = flashcard || current;
        if (!currentFlashcard) return false;
        return !!currentFlashcard.flashcards_salvos_id;
      },
      toggleIsShowingAnswer: () => {
        const { isShowingAnswer } = get();
        set({
          isShowingAnswer: !isShowingAnswer,
        });
      },
      registerAnswer: async (userId: string, value: string, router: AppRouterInstance) => {
        const { current, next, sessaoId, temas, currentThemeIndex, getNextThemeIndex } = get();
        if (!current) return null;

        let tmpCurrent = getNextThemeIndex() || 0;

        const insertData = {
          respostas_flashcards_id_estudante: userId,
          respostas_flashcards_id_flashcard: current.flashcards_id,
          respostas_flashcards_resposta2: value,
          sessoes_estudos_flashcards_id: sessaoId,
          temas_id_atual: temas[currentThemeIndex],
        };

        set((state) => ({
          answers: [...state.answers, { flashcardId: current.flashcards_id, answer: value }],
          currentThemeIndex: tmpCurrent,
        }));

        if (next) {
          set({ current: next, next: null });
        }

        const insert = new Insert({
          entity: "respostas-flashcards",
          body: insertData,
        });

        await insert.build(true);

        // Se não há próximo flashcard, vai para estatísticas
        if (!next) {
          startTransition(() => {
            router.push("/flashcards/estatisticas");
          });
        }
      },
      toggleIsSaving: () => {
        set((state) => ({
          isSaving: !state.isSaving,
        }));
      },
      getLogoColor: (flashcard?: FlashcardType) => {
        const { current } = get();
        const currentFlashcard = flashcard || current;
        if (!currentFlashcard) return undefined;
        if (currentFlashcard.respostas_flashcards_ultima_resposta_flashcard === "Erro")
          return "#ff1ac6";
        if (currentFlashcard.respostas_flashcards_ultima_resposta_flashcard === "Acerto Parcial")
          return "#ffa800";
        if (
          currentFlashcard.respostas_flashcards_ultima_resposta_flashcard ===
          "Acerto com Segurança"
        )
          return "#33ff66";
        if (currentFlashcard.respostas_flashcards_ultima_resposta_flashcard === "Acerto Fácil")
          return "#0066ff";
        return undefined;
      },
      setHasHydrated: (state) => {
        set({
          _hasHydrated: state,
        });
      },
    }),
    {
      name: "flashcards-storage",
      storage: createJSONStorage(() => flashcardStore),
      partialize: (state) => ({
        answers: state.answers,
        current: state.current,
        next: state.next,
      }),
      onRehydrateStorage: (state) => {
        return () => state.setHasHydrated(true);
      },
    }
  )
);

export default useFlashcards;
