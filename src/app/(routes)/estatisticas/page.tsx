"use client";

import Structure from "@/component/structure/GreetingsLogo";
import { Estatisticas as EstatisticasType } from "@/type/Entities";
import Pie from "@global/component/chart/Pie";
import Loading2 from "@global/component/overlay/popup/dialog/Loading2";
import CardList from "@global/component/stat/CardList";
import SimpleLine from "@global/component/stat/SimpleLine";
import { Viewing } from "@global/component/viewing/Viewing";
import { BrazilianDateFormatter } from "@global/formatter/date/Brazilian";
import { useGetRow } from "@global/hook/request/useGetRow";

type Props = {};

export default function page({ }: Props) {
  const { data, setData, loading, error } = useGetRow<EstatisticasType>({
    entity: "estatisticas",
    needsAuthorization: true,
  });

  const brazilianDateFormatter = new BrazilianDateFormatter();

  return (
    <Structure customClass="estudante-statistics-wrapper">
      <Viewing
        data={data}
        loading={loading}
        error={error}
        loadingComponent={<Loading2 loading />}
        renderItem={(item) => (
          <>
            <h1 className="title">Suas estatísticas</h1>

            <div className="card">
              <div className="side">
                <p className="item">Número de flashcards feitos: {item.general.flashcards.total}</p>
                <p className="item variation">Número de acertos: {item.general.flashcards.correct}</p>
                <Pie
                  data={[
                    { title: "Acertos", value: item.general.flashcards.percentage, color: "#33FF66" },
                    { title: "Erros", value: 100 - item.general.flashcards.percentage, color: "#FF1AC6" },
                  ]}
                  title={`${item.general.flashcards.percentage}% de acerto`}
                  subtitle="sobre os flashcards respondidos"
                />
              </div>

              <hr className="divider" />

              <div className="side">
                <p className="item">Número de questões feitas: {item.general.questions.total}</p>
                <p className="item variation">Número de acertos: {item.general.questions.correct}</p>
                <Pie
                  data={[
                    { title: "Acertos", value: item.general.questions.percentage, color: "#33FF66" },
                    { title: "Erros", value: 100 - item.general.questions.percentage, color: "#FF1AC6" },
                  ]}
                  title={`${item.general.questions.percentage}% de acerto`}
                  subtitle="sobre as questões respondidas"
                />
              </div>
            </div>

            <SimpleLine name="Porcentagem geral de acerto" value={item.general.general.percentage.toString()} />

            <CardList
              title="Porcentagem de acerto por área:"
              items={item.accuracyByArea.map((item) => ({
                name: item.name,
                value: `${item.percentage.toString()}%`,
              }))}
              className="accuracy"
            />

            <div className="card today">
              <p className="title">Seu estudo hoje:</p>
              <div className="estatisticas-container">
                <div className="side">
                  <p className="item">
                    Tempo total estudado: <span>{brazilianDateFormatter.getFormattedTime(item.today.studyTime.toString(), "detailed")}</span>
                  </p>
                  <p className="item">
                    Número de flashcards respondidos: <span>{item.today.flashcards}</span>
                  </p>
                  <p className="item">
                    Número de questões respodidas: <span>{item.today.questions}</span>
                  </p>
                  <p className="item">
                    Porcentagem de acerto do dia: <span>{item.today.accuracy}%</span>
                  </p>
                </div>
                <hr className="divider" />
                <div className="side">
                  <Pie
                    data={[
                      { title: "Acertos", value: item.today.accuracy, color: "#33FF66" },
                      { title: "Erros", value: 100 - item.today.accuracy, color: "#FF1AC6" },
                    ]}
                    title={`${item.today.accuracy}% de acerto`}
                    subtitle="no dia de hoje"
                  />
                </div>
              </div>
            </div>

            <CardList
              title="Consistência:"
              items={[
                { name: "Tempo total estudado", value: brazilianDateFormatter.getFormattedTime(item.consistency.totalStudyTime.toString(), "detailed") },
                { name: "Número máximo de dias seguidos", value: `${item.consistency.longestStreak.toString()} dias` },
                { name: "Total de dias estudando", value: `${item.consistency.totalStudyDays.toString()} dias` },
              ]}
              className="accuracy"
            />
          </>
        )}
      />
    </Structure>
  );
}
