// QUESTAO

export type Questao = {
  questoes_id: string;
  questoes_enunciado: string;
  questoes_alternativa_a: string;
  questoes_alternativa_b: string;
  questoes_alternativa_c: string;
  questoes_alternativa_d: string;
  questoes_alternativa_e: string;
  questoes_gabarito: string;
  questoes_comentario_resposta: string;
  questoes_comentario_resposta_url_imagem?: string;
  questoes_referencia_comentario?: string;
  questoes_url_imagem?: string;
  provas_ano: string;
  temas_nome: string;
  areas_nome: string;
  questoes_salvos_id: string;
  questoes_ordem: string;
};

export type QuestoesSalvos = {
  questoes_salvos_id_questao: string;
  questoes_enunciado: string;
  instituicoes_nome_instituicao_com_ano: string;
};

// FLASHCARD

export type Flashcard = {
  flashcards_id: string;
  flashcards_pergunta_titulo: string;
  flashcards_pergunta: string;
  flashcards_comentario_pergunta?: string;
  flashcards_resposta_titulo: string;
  flashcards_resposta: string;
  flashcards_comentario_resposta?: string;
  flashcards_url_imagem?: string;
  temas_nome: string;
  areas_nome: string;
  respostas_flashcards_ultima_resposta_flashcard: string;
  flashcards_salvos_id: string;
};

export type FlashcardsSalvos = {
  flashcards_salvos_id_flashcard: string;
  flashcards_pergunta: string;
  temas_nome: string;
  areas_nome: string;
};

// HOT TOPIC

export type HotTopicsListagem = {
  hot_topics_id: string;
  hot_topics_nome: string;
  temas_nome: string;
  areas_url_imagem: string;
  hot_topics_estudantes_id: string | null;
  hot_topics_salvo: string;
};

export type HotTopicSalvos = {
  hot_topics_salvos_id_hot_topic: string;
  hot_topics_nome: string;
  temas_nome: string;
  areas_nome: string;
};

// MAPA MENTAL

export type MapasMentaisListagem = {
  mapas_mentais_id: string;
  mapas_mentais_nome: string;
  temas_nome: string;
  areas_url_imagem: string;
  mapas_mentais_estudantes_id: string | null;
};

export type MapasMentaisSalvos = {
  mapas_mentais_salvos_id_mapa_mental: string;
  mapas_mentais_nome: string;
  temas_nome: string;
  areas_nome: string;
};

// ESTUDANTE

export type Estudante = {
  estudantes_nome_completo: string;
  estudantes_email: string;
  estudantes_whatsapp: string;
  estudantes_instituicoes_interesse: string;
  estudantes_especialidade: string;
  estudantes_data_nascimento: string;
  estudantes_url_imagem?: string;
};

// FATURA

export type Fatura = {
  faturas_id: string;
  faturas_valor: string;
  faturas_data_hora_cadastro: string;
  estudantes_inicio_vigencia_plano: string;
  periodos_planos_periodo: Periodos;
  faturas_vencimento_plano: string;
  faturas_status: string;
};

export type Periodos = "Semestral" | "Anual" | "Bienal";

// EXTENSIVO

export type diaExtensivo = {
  extensivos_id: string;
  extensivos_nome: string;
  extensivos_dia_semana: diaSemana;
  extensivos_estudantes_id: string;
};

type diaSemana = "Segunda-feira" | "Terça-feira" | "Quarta-feira" | "Quinta-feira" | "Sexta-feira" | "Sábado";

// SIMULADOS

export type RespostasQuestoes = {
  respostas_questoes_id_simulado: string;
  respostas_questoes_id_questao: string;
  respostas_questoes_alternativa: string;
  questoes_gabarito: string;
  questoes_ordem: string;
  instituicoes_nome: string;
  provas_ano: string;
  areas_nome: string;
  estados_uf: string;
  simulados_duracao: string;
};

// ESTATISTICAS

export type Estatisticas = {
  general: {
    flashcards: {
      total: number;
      correct: number;
      percentage: number;
    };
    questions: {
      total: number;
      correct: number;
      percentage: number;
    };
    general: {
      percentage: number;
    };
  };
  accuracyByArea: accuracyByArea;
  today: {
    studyTime: number;
    flashcards: number;
    questions: number;
    accuracy: number;
  };
  consistency: {
    totalStudyTime: number;
    currentStreak: number;
    longestStreak: number;
    totalStudyDays: number;
  };
};

type accuracyByArea = {
  name: string;
  percentage: number;
}[];
