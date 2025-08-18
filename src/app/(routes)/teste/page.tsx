"use client";

import React, { useState, useEffect } from "react";

type Props = {};

// Interface para definir a estrutura de um flashcard
interface Flashcard {
  id: number;
  nome: string;
}

// Interface para flashcards no deck de revisão
interface FlashcardRevisao {
  id: number;
  nextReviewAt: number;
  lastAnswer: "Erro" | "Acerto Parcial" | "Acerto Fácil";
}

// Enum para tipos de resposta
enum TipoResposta {
  ERRO = "Erro",
  ACERTO_PARCIAL = "Acerto Parcial",
  ACERTO_FACIL = "Acerto Fácil",
}

// Configuração dos fatores de cada tipo de resposta
const FATORES_RESPOSTA = {
  [TipoResposta.ERRO]: 5,
  [TipoResposta.ACERTO_PARCIAL]: 20,
  [TipoResposta.ACERTO_FACIL]: 100,
} as const;

// Função para gerar flashcards de um tema específico
const generateFlashcards = (tema: string, quantidade: number, startId: number): Flashcard[] => {
  const flashcards: Flashcard[] = [];

  for (let i = 0; i < quantidade; i++) {
    flashcards.push({
      id: startId + i,
      nome: `${tema} - Flashcard ${i + 1}`,
    });
  }

  return flashcards;
};

export default function page({}: Props) {
  // Gerando os arrays de flashcards para cada tema
  const tema1 = generateFlashcards("Tema1", 150000, 1); // IDs: 1-150000
  const tema2 = generateFlashcards("Tema2", 250000, 150001); // IDs: 150001-400000
  const tema3 = generateFlashcards("Tema3", 300000, 400001); // IDs: 400001-700000

  // Estados para os decks virgem e de revisão
  const [deckVirgem, setDeckVirgem] = useState<Flashcard[]>([]);
  const [deckRevisao, setDeckRevisao] = useState<FlashcardRevisao[]>([]);
  const [posicaoAtual, setPosicaoAtual] = useState(0);

  // Inicializar deck virgem com a intercalação
  useEffect(() => {
    const filaIntercalada = intercalarDecks(tema1, tema2, tema3);
    setDeckVirgem(filaIntercalada);
  }, []);

  // Função para processar resposta de um flashcard
  const processarResposta = (flashcardId: number, tipoResposta: TipoResposta) => {
    // Encontrar o flashcard no deck virgem
    const flashcard = deckVirgem.find((card) => card.id === flashcardId);
    if (!flashcard) return;

    // Calcular nextReviewAt baseado na posição atual + fator da resposta
    const fator = FATORES_RESPOSTA[tipoResposta];
    const nextReviewAt = posicaoAtual + 1 + fator; // +1 porque a posição será incrementada

    // Criar objeto para o deck de revisão
    const flashcardRevisao: FlashcardRevisao = {
      id: flashcardId,
      nextReviewAt,
      lastAnswer: tipoResposta,
    };

    // Remover do deck virgem
    setDeckVirgem((prev) => prev.filter((card) => card.id !== flashcardId));

    // Adicionar ao deck de revisão
    setDeckRevisao((prev) => [...prev, flashcardRevisao]);

    console.log(`📝 Flashcard ${flashcardId} processado:`, {
      resposta: tipoResposta,
      posicaoAtual: posicaoAtual + 1,
      proximaRevisao: nextReviewAt,
      fator: fator,
    });
  };

  // Função para buscar flashcards prontos para revisão
  const buscarFlashcardsParaRevisao = (): FlashcardRevisao[] => {
    return deckRevisao.filter((card) => card.nextReviewAt <= posicaoAtual);
  };

  // Função para obter flashcards disponíveis para revisão em tempo real
  const flashcardsParaRevisao = buscarFlashcardsParaRevisao();

  // Função para obter o próximo flashcard a ser mostrado (lógica principal)
  const obterProximoFlashcard = (): Flashcard | null => {
    // Primeiro verifica se há cards prontos para revisão
    const cardsRevisaoProntos = flashcardsParaRevisao;
    if (cardsRevisaoProntos.length > 0) {
      // Retorna o card de revisão mais antigo (menor nextReviewAt)
      const cardRevisao = cardsRevisaoProntos.sort((a, b) => a.nextReviewAt - b.nextReviewAt)[0];
      // Busca o card original para exibir
      return [...tema1, ...tema2, ...tema3].find(c => c.id === cardRevisao.id) || null;
    }
    
    // Se não há cards para revisão, pega o próximo do deck virgem
    return deckVirgem[0] || null;
  };

  // Flashcard atual a ser mostrado
  const flashcardAtual = obterProximoFlashcard();

  // Função para simular resposta (para demonstração)
  const simularResposta = () => {
    if (!flashcardAtual) {
      alert("Não há mais flashcards para estudar!");
      return;
    }

    // Simular uma resposta aleatória
    const respostas = [TipoResposta.ERRO, TipoResposta.ACERTO_PARCIAL, TipoResposta.ACERTO_FACIL];
    const respostaAleatoria = respostas[Math.floor(Math.random() * respostas.length)];

    // Verifica se o card atual é de revisão ou virgem
    const isCardRevisao = flashcardsParaRevisao.some(card => card.id === flashcardAtual.id);
    
    if (isCardRevisao) {
      // É um card do deck de revisão - apenas atualiza a posição nextReviewAt
      const fator = FATORES_RESPOSTA[respostaAleatoria];
      const nextReviewAt = posicaoAtual + 1 + fator; // +1 porque incrementamos a posição depois
      
      setDeckRevisao(prev => prev.map(card => 
        card.id === flashcardAtual.id 
          ? { ...card, nextReviewAt, lastAnswer: respostaAleatoria }
          : card
      ));
      
      console.log(`🔄 Flashcard ${flashcardAtual.id} RE-REVISADO:`, {
        resposta: respostaAleatoria,
        posicaoAtual: posicaoAtual + 1,
        proximaRevisao: nextReviewAt,
        fator: fator,
      });
    } else {
      // É um card do deck virgem - usar a função original para mover para revisão
      processarResposta(flashcardAtual.id, respostaAleatoria);
    }
    
    // Incrementar posição atual
    setPosicaoAtual(prev => prev + 1);
  };

  // Função para intercalar os decks por índice
  const intercalarDecks = (deck1: Flashcard[], deck2: Flashcard[], deck3: Flashcard[]): Flashcard[] => {
    const resultado: Flashcard[] = [];
    const maxLength = Math.max(deck1.length, deck2.length, deck3.length);

    for (let i = 0; i < maxLength; i++) {
      // Adiciona o card do deck1 se existir no índice atual
      if (i < deck1.length) {
        resultado.push(deck1[i]);
      }

      // Adiciona o card do deck2 se existir no índice atual
      if (i < deck2.length) {
        resultado.push(deck2[i]);
      }

      // Adiciona o card do deck3 se existir no índice atual
      if (i < deck3.length) {
        resultado.push(deck3[i]);
      }
    }

    return resultado;
  };

  // Array intercalado seguindo a lógica de rotação por índices (usando estado dinâmico)
  const filaIntercalada = deckVirgem;

  // Primeiros 10 flashcards das filas para exibição lado a lado
  const primeiros10DeckVirgem = deckVirgem.slice(0, 10);
  const primeiros10DeckRevisao = [...deckRevisao]
    .sort((a, b) => a.nextReviewAt - b.nextReviewAt)
    .slice(0, 10);

  const primeiros10DeckRevisao2 = flashcardsParaRevisao
    .sort((a, b) => a.nextReviewAt - b.nextReviewAt)
    .slice(0, 10)
    .map(cardRevisao => {
      const originalCard = [...tema1, ...tema2, ...tema3].find(c => c.id === cardRevisao.id);
      return {
        ...originalCard!,
        nextReviewAt: cardRevisao.nextReviewAt,
        lastAnswer: cardRevisao.lastAnswer
      };
    });
    

  // Função para executar benchmarks básicos
  const executarBenchmarks = () => {
    console.group("📊 Benchmark - Sistema de Revisão Espaçada");

    console.log("📊 Estado atual do sistema:");
    console.log(`  Deck Virgem: ${deckVirgem.length} cards`);
    console.log(`  Deck Revisão: ${deckRevisao.length} cards`);
    console.log(`  Posição Atual: ${posicaoAtual}`);
    console.log(`  Cards para Revisão: ${flashcardsParaRevisao.length} cards`);

    // Teste 1: Tempo para filtrar por tema
    console.time("⏱️  Filtro por tema");
    const flashcardsTema1 = filaIntercalada.filter((card: Flashcard) => card.id === 700000);
    for (let index = 0; index < filaIntercalada.length; index++) {
      if(filaIntercalada[index].id === 700000) {
        console.log(`🎯 Flashcard ${filaIntercalada[index].id} encontrado no tema 1`);
      }
    }
    console.timeEnd("⏱️  Filtro por tema");
    console.log(`🎯 Flashcards do Tema1 encontrados: ${flashcardsTema1.length}`);

    // Teste 2: Tempo para buscar flashcards para revisão
    console.time("⏱️  Busca cards para revisão");
    const cardsRevisao = buscarFlashcardsParaRevisao();
    console.timeEnd("⏱️  Busca cards para revisão");
    console.log(`🎯 Cards prontos para revisão: ${cardsRevisao.length}`);

    // Teste 3: Tempo para mapear todos os nomes
    console.time("⏱️  Map de todos os nomes");
    const todosNomes = filaIntercalada.map((card: Flashcard) => card.nome);
    console.timeEnd("⏱️  Map de todos os nomes");
    console.log(`🎯 Total de nomes mapeados: ${todosNomes.length}`);

    // Teste 4: Mostrar detalhes do deck de revisão
    if (deckRevisao.length > 0) {
      console.log("🔄 Próximos cards para revisão:");
      deckRevisao
        .sort((a, b) => a.nextReviewAt - b.nextReviewAt)
        .slice(0, 10)
        .forEach((card, index) => {
          const status = card.nextReviewAt <= posicaoAtual ? "✅ PRONTO" : "⏳ AGUARDANDO";
          console.log(
            `  ${index + 1}º: ID ${card.id} | Revisão: ${card.nextReviewAt} | ${status} | ${card.lastAnswer}`
          );
        });
    }

    console.groupEnd();
  };

  const buscar = () => {
    const now = Date.now();
    const buscado = deckVirgem.filter((item) => item.id == 748);
  }

  return (
    <>
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">🎯 Sistema de Revisão Espaçada</h1>

        {/* Status do Sistema */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg mb-6 border">
          <h2 className="font-semibold text-gray-800 mb-3">📊 Status do Sistema</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-white p-3 rounded shadow-sm">
              <div className="text-2xl font-bold text-blue-600">{deckVirgem.length}</div>
              <div className="text-sm text-gray-600">Deck Virgem</div>
            </div>
            <div className="bg-white p-3 rounded shadow-sm">
              <div className="text-2xl font-bold text-purple-600">{deckRevisao.length}</div>
              <div className="text-sm text-gray-600">Deck Revisão</div>
            </div>
            <div className="bg-white p-3 rounded shadow-sm">
              <div className="text-2xl font-bold text-orange-600">{posicaoAtual}</div>
              <div className="text-sm text-gray-600">Posição Atual</div>
            </div>
          </div>
        </div>

        {/* Controles */}
        <div className="bg-white border rounded-lg p-4 mb-6">
          <h2 className="font-semibold text-gray-800 mb-4">🎮 Controles de Simulação</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={simularResposta}
              disabled={deckVirgem.length === 0}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white px-4 py-2 rounded font-medium transition-colors"
            >
              � Simular Resposta Aleatória
            </button>

            <button
              onClick={executarBenchmarks}
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded font-medium transition-colors"
            >
              📊 Executar Benchmarks
            </button>
          </div>

          <div className="mt-3 text-sm text-gray-600">
            <p>
              <strong>💡 Como funciona:</strong>
            </p>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>
                <strong>Erro:</strong> +5 posições (revisão mais frequente)
              </li>
              <li>
                <strong>Acerto Parcial:</strong> +20 posições (revisão moderada)
              </li>
              <li>
                <strong>Acerto Fácil:</strong> +100 posições (revisão distante)
              </li>
            </ul>
          </div>
        </div>

        {/* Flashcard Atual */}
        <div className="bg-white border-2 border-yellow-300 rounded-lg p-6 mb-6 text-center shadow-lg">
          <h2 className="font-semibold text-gray-800 mb-4 text-xl">🎯 Flashcard Atual ({posicaoAtual})</h2>
          {flashcardAtual ? (
            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <div className="text-lg font-bold text-yellow-800 mb-2">
                ID: {flashcardAtual.id}
              </div>
              <div className="text-xl font-semibold text-gray-800 mb-3">
                {flashcardAtual.nome}
              </div>
              <div className="text-sm text-gray-600 mb-4">
                {flashcardsParaRevisao.some(card => card.id === flashcardAtual.id) 
                  ? "📚 Vem do Deck de Revisão" 
                  : "🆕 Vem do Deck Virgem"}
              </div>
              <button
                onClick={simularResposta}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                ✅ Simular Resposta
              </button>
            </div>
          ) : (
            <div className="text-gray-500 text-lg">
              🎉 Parabéns! Você terminou todos os flashcards!
            </div>
          )}
        </div>

        {/* Filas Lado a Lado */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          
          {/* Fila do Deck Virgem */}
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-4 text-center">
              🆕 Fila Deck Virgem ({deckVirgem.length} cards)
            </h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {primeiros10DeckVirgem.length > 0 ? (
                primeiros10DeckVirgem.map((card, index) => (
                  <div 
                    key={card.id} 
                    className={`p-3 border rounded ${
                      card.id === flashcardAtual?.id 
                        ? 'bg-yellow-100 border-yellow-400 border-2' 
                        : 'bg-blue-50 border-blue-200'
                    }`}
                  >
                    <div className="text-xs font-medium text-blue-600 mb-1">
                      #{index + 1} • ID: {card.id}
                    </div>
                    <div className="text-sm font-medium text-blue-800">
                      {card.nome}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-8">
                  🎉 Deck virgem vazio!
                </div>
              )}
            </div>
          </div>

          {/* Fila do Deck de Revisão */}
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-semibold text-purple-800 mb-4 text-center">
              📚 Fila Deck Revisão ({deckRevisao.length} prontos)
            </h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {primeiros10DeckRevisao.length > 0 ? (
                primeiros10DeckRevisao.map((card: any, index: number) => (
                  <div 
                    key={card.id} 
                    className={`p-3 border rounded ${
                      card.id === flashcardAtual?.id 
                        ? 'bg-yellow-100 border-yellow-400 border-2' 
                        : 'bg-purple-50 border-purple-200'
                    }`}
                  >
                    <div className="text-xs font-medium text-purple-600 mb-1">
                      #{index + 1} • ID: {card.id} • Revisão: {card.nextReviewAt}
                    </div>
                    <div className="text-sm font-medium text-purple-800">
                      {card.nome}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Última: {card.lastAnswer}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-8">
                  ⏳ Nenhum card pronto para revisão
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Botão de Benchmark */}
        <div className="text-center mb-6">
          <button
            onClick={executarBenchmarks}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            📊 Executar Benchmarks
          </button>
        </div>

        {/* Informações */}
        <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <p className="mb-2">
            💡 <strong>Como funciona a priorização:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Se há cards de revisão prontos (nextReviewAt ≤ posição atual), eles têm prioridade</li>
            <li>Caso contrário, o próximo card vem do deck virgem</li>
            <li>O card destacado em amarelo é o atual sendo estudado</li>
            <li>Abra o console do navegador (F12) para ver logs detalhados</li>
          </ul>
        </div>
      </div>
    </>
  );
}
