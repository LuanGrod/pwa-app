import { Flashcard as FlashcardType } from "@/type/Entities";
import { Delete } from "@global/request/builder/api/Delete";
import { Insert } from "@global/request/builder/api/Insert";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { startTransition } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createLocalStorageStore } from "./localStorageStore";

type FlashcardAnswerEntry = {
  flashcardId: string;
  answer: string;
};

type FlashcardStore = {
  _hasHydrated: boolean;
  deck: FlashcardType[] | null;
  answers: FlashcardAnswerEntry[];
  isShowingAnswer: boolean;
  isSaving: boolean;
  setDeck: (flashcards: FlashcardType[]) => void;
  getCurrent: () => FlashcardType | null;
  getNext: () => FlashcardType | null;
  handleSave: (userId: string, flashcard?: FlashcardType) => Promise<null | undefined>;
  getSavedStatus: (flashcard?: FlashcardType) => boolean;
  toggleIsShowingAnswer: () => void;
  registerAnswer: (
    userId: string,
    value: string,
    router: AppRouterInstance
  ) => Promise<null | void>;
  shift: () => void;
  toggleIsSaving: () => void;
  count: () => number;
  getLogoColor: (flashcard?: FlashcardType) => string | undefined;
  setHasHydrated: (state: any) => void;
};

let flashcardStore = createLocalStorageStore(10);

const useFlashcards = create<FlashcardStore>()(
  persist(
    (set, get) => ({
      _hasHydrated: false,
      deck: [],
      answers: [],
      isShowingAnswer: false,
      isSaving: false,
      setDeck: (flashcards: FlashcardType[]) => {
        set({ deck: flashcards, answers: [] });
      },
      getCurrent: () => {
        const { deck } = get();
        if (!deck || deck.length === 0) return null;
        return deck[0];
      },
      getNext: () => {
        const { deck } = get();
        if (!deck || deck.length < 2) return null;
        return deck[1];
      },
      shift: () => {
        set((state) => ({
          deck: state.deck ? state.deck.slice(1) : [],
        }));
      },
      handleSave: async (userId: string, flashcard?: FlashcardType) => {
        const { getCurrent, deck, toggleIsSaving } = get();

        toggleIsSaving();

        if (!deck || deck.length === 0) return null;

        const currentFlashcard = flashcard || getCurrent();

        if (!currentFlashcard) return null;

        if (currentFlashcard.flashcards_salvos_id) {
          let tempId = currentFlashcard.flashcards_salvos_id;
          set((state) => ({
            deck: state.deck?.map((flashcards) =>
              flashcards.flashcards_id === currentFlashcard.flashcards_id
                ? { ...flashcards, flashcards_salvos_id: "" }
                : flashcards
            ),
          }));
          const deleting = new Delete({
            entity: "flashcards-salvos",
            id: tempId,
          });
          await deleting.build(true);
        } else {
          set((state) => ({
            deck:
              state.deck &&
              state.deck.map((flashcard) =>
                flashcard.flashcards_id === currentFlashcard.flashcards_id
                  ? { ...flashcard, flashcards_salvos_id: "response.data.id" }
                  : flashcard
              ),
          }));
          const insertData = {
            ["flashcards_salvos_id_flashcard"]: currentFlashcard.flashcards_id,
            ["flashcards_salvos_id_estudante"]: userId,
          };
          const insert = new Insert({
            entity: "flashcards-salvos",
            body: insertData,
          });
          const response = await insert.build(true);
          if (response.success) {
            set((state) => ({
              deck: state.deck?.map((flashcard) =>
                flashcard.flashcards_id === currentFlashcard.flashcards_id
                  ? { ...flashcard, flashcards_salvos_id: response.data.id || "" }
                  : flashcard
              ),
            }));
          }
        }
        toggleIsSaving();
      },
      getSavedStatus: (flashcard?: FlashcardType) => {
        const { getCurrent } = get();
        const currentFlashcard = flashcard || getCurrent();
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
        const { getCurrent, shift, deck, count } = get();
        const currentFlashcard = getCurrent();
        if (!currentFlashcard) return null;

        set((state) => ({
          answers: [
            ...state.answers,
            { flashcardId: currentFlashcard.flashcards_id, answer: value },
          ],
        }));

        if (count() > 1) {
          shift();
        }

        const insertData = {
          respostas_flashcards_id_estudante: userId,
          respostas_flashcards_id_flashcard: currentFlashcard.flashcards_id,
          respostas_flashcards_resposta2: value,
        };

        const insert = new Insert({
          entity: "respostas-flashcards",
          body: insertData,
        });

        await insert.build(true);

        if (!deck || deck.length === 1) {
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
      count: () => {
        const { deck } = get();
        if (!deck || deck.length === 0) return 0;
        return deck.length;
      },
      getLogoColor: (flashcard?: FlashcardType) => {
        const { getCurrent } = get();
        const currentFlashcard = flashcard || getCurrent();
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
      }),
      onRehydrateStorage: (state) => {
        return () => state.setHasHydrated(true);
      },
    }
  )
);

export default useFlashcards;
