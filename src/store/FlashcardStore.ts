import { Delete } from "@global/request/builder/api/Delete";
import { Insert } from "@global/request/builder/api/Insert";
import { Flashcard as FlashcardType } from "@/type/Entities";
import { create } from "zustand";

type FlashcardAnswerEntry = {
  flashcardId: string;
  answer: string;
};

type FlashcardStore = {
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
  registerAnswer: (userId: string, value: string) => Promise<null | void>;
  shift: () => void;
  toggleIsSaving: () => void;
  count: () => number;
  getLogoColor: (flashcard?: FlashcardType) => string | undefined;
};

const useFlashcards = create<FlashcardStore>((set, get) => ({
  deck: [],
  answers: [],
  isShowingAnswer: false,
  isSaving: false,
  // Set the flashcards list and reset answers
  setDeck: (flashcards: FlashcardType[]) => {
    set({ deck: flashcards, answers: [] });
  },
  // Always returns the first flashcard in the list
  getCurrent: () => {
    const { deck } = get();
    if (!deck || deck.length === 0) return null;
    return deck[0];
  },
  // Returns the next flashcard (second in the list)
  getNext: () => {
    const { deck } = get();
    if (!deck || deck.length < 2) return null;
    return deck[1];
  },
  // Remove the first flashcard from the list
  shift: () => {
    set((state) => ({
      deck: state.deck ? state.deck.slice(1) : [],
    }));
  },
  // Save/unsave logic remains unchanged
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
        data: insertData,
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
  // Checks if the flashcard (first by default) is saved
  getSavedStatus: (flashcard?: FlashcardType) => {
    const { getCurrent } = get();
    const currentFlashcard = flashcard || getCurrent();
    if (!currentFlashcard) return false;
    return !!currentFlashcard.flashcards_salvos_id;
  },
  // Toggle answer visibility
  toggleIsShowingAnswer: () => {
    const { isShowingAnswer } = get();
    set({
      isShowingAnswer: !isShowingAnswer,
    });
  },
  // Register answer: append to answers and remove the first flashcard
  registerAnswer: async (userId: string, value: string) => {
    const { getCurrent, shift, answers, deck, count } = get();
    const currentFlashcard = getCurrent();
    if (!currentFlashcard) return null;
    // Append answer to answers
    set((state) => ({
      answers: [...state.answers, { flashcardId: currentFlashcard.flashcards_id, answer: value }],
    }));
    // Remove the first flashcard
    if (count() > 1) {
      shift();
    }
    // Save answer to backend
    const insertData = {
      respostas_flashcards_id_estudante: userId,
      respostas_flashcards_id_flashcard: currentFlashcard.flashcards_id,
      respostas_flashcards_resposta2: value,
    };
    const insert = new Insert({
      entity: "respostas-flashcards",
      data: insertData,
    });
    await insert.build(true);
    // If no more flashcards, show alert (for now)
    if (!deck || deck.length === 1) {
      alert(
        `FIM DO DECK - redirecionar para a tela de estatisticas\n${JSON.stringify(
          [...answers, { flashcardId: currentFlashcard.flashcards_id, answer: value }],
          null,
          2
        )}`
      );
    }
  },
  // Toggle saving state
  toggleIsSaving: () => {
    set((state) => ({
      isSaving: !state.isSaving,
    }));
  },
  // Count remaining flashcards
  count: () => {
    const { deck } = get();
    if (!deck || deck.length === 0) return 0;
    return deck.length;
  },
  // Get color for logo based on last answer (first by default)
  getLogoColor: (flashcard?: FlashcardType) => {
    const { getCurrent } = get();
    const currentFlashcard = flashcard || getCurrent();
    if (!currentFlashcard) return undefined;
    if (currentFlashcard.respostas_flashcards_ultima_resposta_flashcard === "Erro")
      return "#ff1ac6";
    if (currentFlashcard.respostas_flashcards_ultima_resposta_flashcard === "Acerto Parcial")
      return "#ffa800";
    if (currentFlashcard.respostas_flashcards_ultima_resposta_flashcard === "Acerto com Segurança")
      return "#33ff66";
    if (currentFlashcard.respostas_flashcards_ultima_resposta_flashcard === "Acerto Fácil")
      return "#0066ff";
    return undefined;
  },
}));

export default useFlashcards;
