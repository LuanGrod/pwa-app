import HowToStudyContent from "@/component/atomic/HowToStudyContent";
import ReturnLogoStructure from "../../../component/structure/ReturnLogo";
import styles from "./page.module.css";

type Props = {};

const conteudos = [
  {
    title: "HOT TOPICS",
    paragraphs: [
      "Resumos diretos ao ponto sobre os temas que mais caem nas provas de residência médica.",
      "Temas selecionados com base nas últimas provas das principais instituições, priorizando o que realmente importa.",
    ],
    listItems: [
      "Leitura rápida e direcionada;",
      "Baseados nos principais tratados médicos do mundo;",
      "Ideal para o primeiro contato com o conteúdo (fase de aprendizado).",
    ],
  },
  {
    title: "MAPAS MENTAIS",
    paragraphs: [
      "Organização visual dos conteúdos abordados nos Hot Topics.",
      "Use esta ferramenta para consolidar o entendimento da teoria e facilitar sua memorização.",
    ],
    listItems: [
      "Mapas mentais intuitivos;",
      "Facilitação do entendimento;",
      "Alinhamento do raciocínio clínico;",
      "Ótimos para revisões de véspera.",
    ],
  },
  {
    title: "FLASHCARDS",
    paragraphs: [
      "Método de estudo ativo focado na memorização por repetição espaçada.",
      "Todos os cards incluem resposta objetiva e comentário aprofundado para contextualização clínica.",
    ],
    listItems: [
      "Algoritmo de repetição espaçada que adapta a repetição dos cards à sua curva de aprendizado;",
      "Estudo produtivo e rápido, focado em memorização ativa;",
      "Ótimo para estudar em qualquer lugar, mesmo com pouco tempo.",
    ],
  },
  {
    title: "QUESTÕES",
    paragraphs: [
      "Treinamento real com as questões das provas de residência médica.",
      "Todas possuem comentários claros, objetivos e didáticos.",
    ],
    listItems: [
      "Questões separadas por instituição, tema e ano, dentre outros filtros que podem ser aplicados;",
      "Comentários com abordagem didática e direcionada;",
      "Essencial para aplicar e fixar os conhecimentos já nos moldes das provas.",
    ],
  },
  {
    title: "EXTENSIVOS",
    paragraphs: [
      "Seu cronograma ao longo do ano.",
      "Organiza o que deve ser estudado semanalmente, combinando direcionamento, teoria, revisão e prática.",
    ],
    listItems: [
      "Guia completo de estudos para o ano inteiro;",
      "Integra Hot Topics, Mapas Mentais, Flashcards e Questões;",
      "Mantém constância e evita sobrecarga nos últimos meses.",
    ],
  },
  {
    title: "SIMULADO",
    paragraphs: [
      "Simule as condições reais da prova.",
      "Treine sua gestão de tempo, identifique seus pontos fracos e monitore sua evolução.",
    ],
    listItems: ["Provas cronometradas;", "Estatísticas de desempenho;", "Ferramenta essencial para autoconhecimento."],
  },
];

export default function page({}: Props) {
  return (
    <ReturnLogoStructure>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Como estudar com o aplicativo?</h1>
        <p className={styles.paragraph}>
          Este aplicativo foi desenvolvido com foco total na sua aprovação nas principais provas de residência médica do
          país.
        </p>
        <p className={styles.paragraph}>
          Aqui, você encontra os recursos mais eficazes da preparação moderna, organizados de forma estratégica,
          didática e prática.
        </p>
        <p className={styles.paragraph}>Entenda como cada seção pode ser aproveitada:</p>

        {conteudos.map((item) => (
          <HowToStudyContent
            key={item.title}
            title={item.title}
            paragraphs={item.paragraphs}
            listItems={item.listItems}
          />
        ))}
      </div>

      <h3 className={styles.method}>Metodologia MedRQE</h3>
    </ReturnLogoStructure>
  );
}
