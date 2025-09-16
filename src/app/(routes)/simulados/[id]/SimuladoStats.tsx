"use client";

import QuestoesErradas from "@/component/overlay/drawer/QuestoesErradas";
import CardSimulado from "@/component/stat/CardSimulado";
import { RespostasQuestoes } from "@/type/Entities";
import { LinkView } from "@global/component/atomic/LinkView";
import { Shadow as ShadowBtn } from "@global/component/button/Shadow";
import { Switch as SwitchBtn } from "@global/component/button/Switch";
import Loading2 from "@global/component/overlay/popup/dialog/Loading2";
import CardList from "@global/component/stat/CardList";
import SimpleLine from "@global/component/stat/SimpleLine";
import { Viewing } from "@global/component/viewing/Viewing";
import { BrazilianDateFormatter } from "@global/formatter/date/Brazilian";
import useToggleStatus from "@global/hook/overlay/useToggleStatus";
import { useListing } from "@global/hook/request/useListing";

type Props = { id: string };

export default function SimuladoStats({ id }: Props) {
  const { isActive, toggle } = useToggleStatus();

  const { data, loading, error } = useListing<RespostasQuestoes>({
    entity: "respostas-questoes",
    needsAuthorization: true,
    id: id
  });

  const brazilianDateFormatter = new BrazilianDateFormatter()

  return (
    <Viewing<Listagem<RespostasQuestoes>>
      data={data}
      loading={loading}
      error={error}
      loadingComponent={<Loading2 loading={loading} />}
      renderItem={(item) => {
        const totalQuestions = item.rows.length;
        const answeredQuestions = item.rows.filter(row => row.respostas_questoes_alternativa ).length;
        const correctAnswers = item.rows.filter(row => row.respostas_questoes_alternativa === row.questoes_gabarito).length;
        const incorrectAnswers = item.rows.filter(row => row.respostas_questoes_alternativa && row.respostas_questoes_alternativa !== row.questoes_gabarito).length;
        const unansweredQuestions = item.rows.filter(row => !row.respostas_questoes_alternativa).length;
        const correctPercentageOverRespondedQuestions = answeredQuestions > 0 ? Math.round((correctAnswers / answeredQuestions) * 100) : 0;
        const estado = item.rows[0]?.estados_uf;
        const instituicao = item.rows[0]?.instituicoes_nome;
        const anoProva = item.rows[0]?.provas_ano;
        const duracao = brazilianDateFormatter.getFormattedTime(item.rows[0]?.simulados_duracao, "detailed");

        // Calcula a porcentagem de acertos por área baseado nos dados da API
        const accuracyByArea = item.rows.reduce((areaGroups, row) => {
          const area = row.areas_nome;
          
          if (!areaGroups[area]) {
            areaGroups[area] = {
              total: 0,
              correct: 0,
            };
          }
          
          // Conta apenas questões respondidas para o cálculo da porcentagem
          if (row.respostas_questoes_alternativa !== null) {
            areaGroups[area].total++;
            if (row.respostas_questoes_alternativa === row.questoes_gabarito) {
              areaGroups[area].correct++;
            }
          }
          
          return areaGroups;
        }, {} as Record<string, { total: number; correct: number }>);

        // Mapeia os dados da API para o formato esperado pelo componente QuestoesErradas
        const answersForErradasDialog = item.rows
          .filter(row => row.respostas_questoes_alternativa !== row.questoes_gabarito) // mostra as questoes nao respondidas e incorretas
          .map(row => ({
            id: row.respostas_questoes_id_questao,
            ordem: row.questoes_ordem,
          }));

        return (<main className="content-wrapper simulado-statistics-wrapper">
          <div className="section">
            <h1 className="title">Gabarito da prova</h1>
            <p className="exam">{estado}: {instituicao}</p>
            <p className="year">Prova de {anoProva}</p>

            <CardSimulado
              totalQuestions={totalQuestions}
              answeredQuestions={answeredQuestions}
              correctAnswers={correctAnswers}
              incorrectAnswers={incorrectAnswers}
              unansweredQuestions={unansweredQuestions}
              correctPercentageOverRespondedQuestions={correctPercentageOverRespondedQuestions}
            />

            <SimpleLine name="Tempo gasto na prova" value={duracao} />

            <CardList
              title="Porcentagem de acerto por área:"
              items={Object.entries(accuracyByArea)
                .map(([area, stats]) => {
                  const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
                  return {
                    name: area,
                    value: `${accuracy}%`
                  };
                })
                .sort((a, b) => a.name.localeCompare(b.name)) // Ordena alfabeticamente por área
              }
              className="accuracy"
            />
          </div>

          <div className="section">
            <ShadowBtn className="view-wrong" onClick={toggle}>Ver questões erradas</ShadowBtn>
            <LinkView href="/simulados"><SwitchBtn className="save-exit">Sair</SwitchBtn></LinkView>
            <QuestoesErradas open={isActive} onClose={toggle} answers={answersForErradasDialog} />
          </div>
        </main>)
      }}
    />
  )
}