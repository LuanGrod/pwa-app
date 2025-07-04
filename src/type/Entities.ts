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
  questoes_referencia_comentario?: null;
  questoes_url_imagem?: string;
  provas_ano: string;
  temas_nome: string;
  areas_nome: string;
  questoes_salvos_id: string;
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
  respostas_flashcards_resposta: string;
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
