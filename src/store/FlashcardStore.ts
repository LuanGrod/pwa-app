import { Delete } from "@/request/builder/Delete";
import { Insert } from "@/request/builder/Insert";
import { Flashcard as FlashcardType } from "@/type/Entities";
import { create } from "zustand";

type FlashcardAnswerType = {
  answer: string;
};

type FlashcardStore = {
  flashcardsList: FlashcardType[] | null;
  flashcardsAnswers: FlashcardAnswerType[] | null;
  index: number;
  isShowingAnswer: boolean;
  setFlashcardsList: (flashcards: FlashcardType[]) => void;
  setAnswer: (value: string) => void;
  getCurrentFlashcard: () => FlashcardType | null;
  getCurrentAnswer: () => FlashcardAnswerType | null;
  handleSave: (userId: string) => Promise<null | undefined>;
  getCurrentFlashcardSavedStatus: () => boolean;
  toggleIsShowingAnswer: () => void;
  registerAnswer: (userId: string, value: string) => Promise<null | void>;
  nextIndex: () => void;
};

const useFlashcards = create<FlashcardStore>((set, get) => ({
  flashcardsList: [],
  flashcardsAnswers: [],
  index: 0,
  isShowingAnswer: false,
  setFlashcardsList: (flashcards: FlashcardType[]) => {
    set({
      flashcardsList: flashcards,
      flashcardsAnswers: flashcards.map((flashcard) => ({
        answer: "",
      })),
    });
  },
  setAnswer: (value: string) => {
    const { flashcardsAnswers, index } = get();

    if (!flashcardsAnswers || flashcardsAnswers.length === 0) return;

    set((state) => ({
      flashcardsAnswers:
        state.flashcardsAnswers &&
        state.flashcardsAnswers.map((flashcard, i) =>
          i === index
            ? { ...flashcard, answer: value === flashcard.answer ? "" : value }
            : flashcard
        ),
    }));
  },
  getCurrentFlashcard: () => {
    const { flashcardsList, index } = get();
    if (!flashcardsList || flashcardsList.length === 0) return null;
    return flashcardsList[index];
  },
  getCurrentAnswer: () => {
    const { flashcardsAnswers, index } = get();
    if (!flashcardsAnswers || flashcardsAnswers.length === 0) return null;
    return flashcardsAnswers[index];
  },
  nextIndex: () => {
    const { flashcardsList } = get();
    if (!flashcardsList || flashcardsList.length === 0) return null;
    set((state) => ({
      index:
        state.flashcardsList && state.index + 1 < state.flashcardsList.length
          ? state.index + 1
          : state.index,
    }));
  },
  handleSave: async (userId: string) => {
    const { getCurrentFlashcard, flashcardsList } = get();

    if (!flashcardsList || flashcardsList.length === 0) return null;

    const currentFlashcard = getCurrentFlashcard();
    if (!currentFlashcard) return null;

    if (currentFlashcard.flashcards_salvos_id) {
      let tempId = currentFlashcard.flashcards_salvos_id;

      set((state) => ({
        flashcardsList:
          state.flashcardsList &&
          state.flashcardsList.map((flashcards) =>
            flashcards.flashcards_id === currentFlashcard.flashcards_id
              ? { ...flashcards, flashcards_salvos_id: "" }
              : flashcards
          ),
      }));

      const deleting = new Delete({
        entity: "flashcards-salvos",
        id: tempId,
      });

      const response = await deleting.build(true);
    } else {
      set((state) => ({
        flashcardsList:
          state.flashcardsList &&
          state.flashcardsList.map((flashcard) =>
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
        data: insertData,
      });

      const response = await insert.build(true);

      if (response.success) {
        set((state) => ({
          flashcardsList:
            state.flashcardsList &&
            state.flashcardsList.map((flashcard) =>
              flashcard.flashcards_id === currentFlashcard.flashcards_id
                ? { ...flashcard, flashcards_salvos_id: response.data.id || "" }
                : flashcard
            ),
        }));
      }
    }
  },
  getCurrentFlashcardSavedStatus: () => {
    const { getCurrentFlashcard } = get();

    const currentFlashcard = getCurrentFlashcard();

    if (!currentFlashcard) return false;

    return !!currentFlashcard.flashcards_salvos_id;
  },
  toggleIsShowingAnswer: () => {
    const { isShowingAnswer } = get();
    set({
      isShowingAnswer: !isShowingAnswer,
    });
  },
  registerAnswer: async (userId: string, value: string) => {
    const {
      getCurrentFlashcard,
      getCurrentAnswer,
      toggleIsShowingAnswer,
      flashcardsList,
      flashcardsAnswers,
      nextIndex,
      index,
    } = get();
    const currentFlashcard = getCurrentFlashcard();
    const currentAnswer = getCurrentAnswer();

    if (
      !flashcardsList ||
      flashcardsList.length === 0 ||
      !flashcardsAnswers ||
      flashcardsAnswers.length === 0 ||
      !currentFlashcard ||
      !currentAnswer
    )
      return null;

    const insertData = {
      respostas_flashcards_id_estudante: userId,
      respostas_flashcards_id_flashcard: currentFlashcard.flashcards_id,
      respostas_flashcards_resposta2: value,
    };

    nextIndex();
    toggleIsShowingAnswer();
    set((state) => ({
      flashcardsAnswers:
        state.flashcardsAnswers &&
        state.flashcardsAnswers.map((flashcard, i) =>
          i === index
            ? { ...flashcard, answer: value === flashcard.answer ? "" : value }
            : flashcard
        ),
    }));

    const insert = new Insert({
      entity: "respostas-flashcards",
      data: insertData,
    });

    const response = await insert.build(true);
  },
}));

export default useFlashcards;
