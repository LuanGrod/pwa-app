import { create } from "zustand";
import { Questao as QuestaoType } from "@/type/Entities";
import { Insert } from "@/request/builder/Insert";

type QuestoesStore = {
  questoesLista: QuestaoType[];
  setQuestoesLista: (questoes: QuestaoType[]) => void;
  index: number;
  nextIndex: () => void;
  getCurrentQuestao: () => QuestaoType;
  previousIndex: () => void;
  countQuestoes: () => number;
  getInsertData: (userId: string) => any;
  currentAnswer: string;
  setCurrentAnswer: (value: string) => void;
  registerAnswer: (userId: string) => Promise<void>;
};

const useQuestoes = create<QuestoesStore>((set, get) => ({
  questoesLista: [
    {
      questoes_id: "1",
      questoes_enunciado: "Qual é a capital do Brasil?",
      questoes_alternativa_a: "Rio de Janeiro",
      questoes_alternativa_b: "Brasília",
      questoes_alternativa_c: "São Paulo",
      questoes_alternativa_d: "Salvador",
      questoes_alternativa_e: "Belo Horizonte",
      questoes_gabarito: "B",
      questoes_comentario_resposta: "A capital do Brasil é Brasília, inaugurada em 1960.",
      questoes_comentario_resposta_url_imagem:
        "Screenshot%20from%202025-05-29%2010-51-32-47af7fca91dd663217384fadcd58c8ab.png",
      questoes_referencia_comentario: null,
      questoes_url_imagem: "Screenshot%20from%202025-05-29%2010-51-32-47af7fca91dd663217384fadcd58c8ab.png",
      provas_ano: "2022",
      temas_nome: "Geografia",
      areas_nome: "Ciências Humanas",
      questoes_salvos_id: "",
    },
    {
      questoes_id: "2",
      questoes_enunciado: "Quem escreveu Dom Casmurro?",
      questoes_alternativa_a: "Machado de Assis",
      questoes_alternativa_b: "José de Alencar",
      questoes_alternativa_c: "Carlos Drummond de Andrade",
      questoes_alternativa_d: "Cecília Meireles",
      questoes_alternativa_e: "Clarice Lispector",
      questoes_gabarito: "A",
      questoes_comentario_resposta: "Machado de Assis é o autor de Dom Casmurro.",
      questoes_comentario_resposta_url_imagem:
        "Screenshot%20from%202025-05-29%2010-51-32-47af7fca91dd663217384fadcd58c8ab.png",
      questoes_referencia_comentario: null,
      questoes_url_imagem: "Screenshot%20from%202025-05-29%2010-51-32-47af7fca91dd663217384fadcd58c8ab.png",
      provas_ano: "2021",
      temas_nome: "Literatura",
      areas_nome: "Linguagens",
      questoes_salvos_id: "1002",
    },
    {
      questoes_id: "3",
      questoes_enunciado: "Qual elemento químico tem o símbolo O?",
      questoes_alternativa_a: "Ouro",
      questoes_alternativa_b: "Oxigênio",
      questoes_alternativa_c: "Osmio",
      questoes_alternativa_d: "Organésio",
      questoes_alternativa_e: "",
      questoes_gabarito: "B",
      questoes_comentario_resposta: "O símbolo O representa o elemento Oxigênio.",
      questoes_comentario_resposta_url_imagem:
        "Screenshot%20from%202025-05-29%2010-51-32-47af7fca91dd663217384fadcd58c8ab.png",
      questoes_referencia_comentario: null,
      questoes_url_imagem: "Screenshot%20from%202025-05-29%2010-51-32-47af7fca91dd663217384fadcd58c8ab.png",
      provas_ano: "2020",
      temas_nome: "Química",
      areas_nome: "Ciências da Natureza",
      questoes_salvos_id: "",
    },
    {
      questoes_id: "4",
      questoes_enunciado: "Em que ano ocorreu a Proclamação da República no Brasil?",
      questoes_alternativa_a: "1888",
      questoes_alternativa_b: "1889",
      questoes_alternativa_c: "1890",
      questoes_alternativa_d: "1879",
      questoes_alternativa_e: "",
      questoes_gabarito: "B",
      questoes_comentario_resposta: "A Proclamação da República ocorreu em 15 de novembro de 1889.",
      questoes_comentario_resposta_url_imagem:
        "Screenshot%20from%202025-05-29%2010-51-32-47af7fca91dd663217384fadcd58c8ab.png",
      questoes_referencia_comentario: null,
      questoes_url_imagem: "Screenshot%20from%202025-05-29%2010-51-32-47af7fca91dd663217384fadcd58c8ab.png",
      provas_ano: "2019",
      temas_nome: "História do Brasil",
      areas_nome: "Ciências Humanas",
      questoes_salvos_id: "1004",
    },
    {
      questoes_id: "5",
      questoes_enunciado: "Qual é o resultado de 7 x 8?",
      questoes_alternativa_a: "54",
      questoes_alternativa_b: "56",
      questoes_alternativa_c: "",
      questoes_alternativa_d: "",
      questoes_alternativa_e: "",
      questoes_gabarito: "B",
      questoes_comentario_resposta: "7 vezes 8 é igual a 56.",
      questoes_comentario_resposta_url_imagem:
        "Screenshot%20from%202025-05-29%2010-51-32-47af7fca91dd663217384fadcd58c8ab.png",
      questoes_referencia_comentario: null,
      questoes_url_imagem: "Screenshot%20from%202025-05-29%2010-51-32-47af7fca91dd663217384fadcd58c8ab.png",
      provas_ano: "2023",
      temas_nome: "Matemática Básica",
      areas_nome: "Matemática",
      questoes_salvos_id: "",
    },
    {
      questoes_id: "6",
      questoes_enunciado: "Qual planeta é conhecido como o planeta vermelho?",
      questoes_alternativa_a: "Terra",
      questoes_alternativa_b: "Marte",
      questoes_alternativa_c: "",
      questoes_alternativa_d: "",
      questoes_alternativa_e: "",
      questoes_gabarito: "B",
      questoes_comentario_resposta: "Marte é conhecido como o planeta vermelho devido à cor de sua superfície.",
      questoes_comentario_resposta_url_imagem:
        "Screenshot%20from%202025-05-29%2010-51-32-47af7fca91dd663217384fadcd58c8ab.png",
      questoes_referencia_comentario: null,
      questoes_url_imagem: "Screenshot%20from%202025-05-29%2010-51-32-47af7fca91dd663217384fadcd58c8ab.png",
      provas_ano: "2022",
      temas_nome: "Astronomia",
      areas_nome: "Ciências da Natureza",
      questoes_salvos_id: "1006",
    },
    {
      questoes_id: "7",
      questoes_enunciado: "Quem foi o primeiro presidente do Brasil?",
      questoes_alternativa_a: "Screenshot%20from%202025-05-29%2010-51-32-47af7fca91dd663217384fadcd58c8ab.png",
      questoes_alternativa_b: "Screenshot%20from%202025-05-29%2010-51-32-47af7fca91dd663217384fadcd58c8ab.png",
      questoes_alternativa_c: "Screenshot%20from%202025-05-29%2010-51-32-47af7fca91dd663217384fadcd58c8ab.png",
      questoes_alternativa_d: "Screenshot%20from%202025-05-29%2010-51-32-47af7fca91dd663217384fadcd58c8ab.png",
      questoes_alternativa_e: "",
      questoes_gabarito: "B",
      questoes_comentario_resposta: "Deodoro da Fonseca foi o primeiro presidente do Brasil.",
      questoes_comentario_resposta_url_imagem:
        "Screenshot%20from%202025-05-29%2010-51-32-47af7fca91dd663217384fadcd58c8ab.png",
      questoes_referencia_comentario: null,
      questoes_url_imagem: "Screenshot%20from%202025-05-29%2010-51-32-47af7fca91dd663217384fadcd58c8ab.png",
      provas_ano: "2018",
      temas_nome: "História do Brasil",
      areas_nome: "Ciências Humanas",
      questoes_salvos_id: "",
    },
    {
      questoes_id: "8",
      questoes_enunciado: "Qual é a fórmula da água?",
      questoes_alternativa_a: "Screenshot%20from%202025-05-29%2010-51-32-47af7fca91dd663217384fadcd58c8ab.png",
      questoes_alternativa_b: "Screenshot%20from%202025-05-29%2010-51-32-47af7fca91dd663217384fadcd58c8ab.png",
      questoes_alternativa_c: "Screenshot%20from%202025-05-29%2010-51-32-47af7fca91dd663217384fadcd58c8ab.png",
      questoes_alternativa_d: "Screenshot%20from%202025-05-29%2010-51-32-47af7fca91dd663217384fadcd58c8ab.png",
      questoes_alternativa_e: "",
      questoes_gabarito: "B",
      questoes_comentario_resposta: "A fórmula da água é H2O.",
      questoes_comentario_resposta_url_imagem:
        "Screenshot%20from%202025-05-29%2010-51-32-47af7fca91dd663217384fadcd58c8ab.png",
      questoes_referencia_comentario: null,
      questoes_url_imagem: "Screenshot%20from%202025-05-29%2010-51-32-47af7fca91dd663217384fadcd58c8ab.png",
      provas_ano: "2023",
      temas_nome: "Química",
      areas_nome: "Ciências da Natureza",
      questoes_salvos_id: "1008",
    },
  ],
  setQuestoesLista: (questoes: QuestaoType[]) => set({ questoesLista: questoes }),
  index: 0,
  countQuestoes: () => get().questoesLista.length || 0,
  getCurrentQuestao: () => {
    const { questoesLista, index } = get();
    return questoesLista[index];
  },
  nextIndex: () =>
    set((state) => ({
      index: state.index + 1 < state.questoesLista.length ? state.index + 1 : state.index,
    })),
  previousIndex: () =>
    set((state) => ({
      index: state.index - 1 < 0 ? 0 : state.index - 1,
    })),
  registerAnswer: async (userId: string) => {
    const { getCurrentQuestao, currentAnswer } = get();
    if (!getCurrentQuestao() || !currentAnswer ) return;

    const insertData = {
      respostas_questoes_id_estudante: userId,
      respostas_questoes_id_questao: getCurrentQuestao().questoes_id,
      respostas_questoes_alternativa2: currentAnswer,
    };

    const insert = new Insert({
      entity: "respostas-questoes",
      data: insertData,
    });

    await insert.build(true);

    set((state) => ({
      currentAnswer: "",
      index: state.index + 1 < state.questoesLista.length ? state.index + 1 : state.index,
    }));
  },
  getInsertData: (userId: string) => {
    const { getCurrentQuestao } = get();
    return {
      ["questoes_salvos_id_questao"]: getCurrentQuestao().questoes_id,
      ["questoes_salvos_id_estudante"]: userId,
    };
  },
  currentAnswer: "",
  setCurrentAnswer: (value: string) => set({ currentAnswer: value }),
}));

export default useQuestoes;
