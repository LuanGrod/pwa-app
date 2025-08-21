import { accuracyByArea } from "@/type/Entities";
import { Switch as SwitchBtn } from "@global/component/button/Switch";
import Pie from "@global/component/chart/Pie";
import { useRouter } from "next/navigation";
import { startTransition } from "react";

type Props = {
  entity: string;
  rightAnswers: number;
  wrongAnswers: number;
  chartLabel: string;
  cardTitle1: string;
  cardTitle2: string;
  accuracyByArea: accuracyByArea;
  count: number;
  href: string;
}

export default function SessionEndStatistics({ entity, rightAnswers, wrongAnswers, chartLabel, cardTitle1, cardTitle2, accuracyByArea, count, href }: Props) {
  const router = useRouter();

  const redirectOnClick = () => {
    startTransition(() => {
      router.push(href);
    })
  }

  const percentage = Math.round((!rightAnswers && !wrongAnswers) ? 0 : rightAnswers / (rightAnswers + wrongAnswers) * 100);

  return (
    <main className="content-wrapper session-statistics-wrapper">
      <h1 className="title">{entity.charAt(0).toUpperCase() + entity.slice(1)}</h1>
      <h2 className="subtitle">Estatísticas da sessão!</h2>

      <div className="stat-card">
        <p className="title">{cardTitle1} {rightAnswers + wrongAnswers}</p>
        <Pie
          data={[
            { title: 'Acertos', value: rightAnswers, color: '#33FF66' },
            { title: 'Erros', value: (!rightAnswers && !wrongAnswers) ? 1 : wrongAnswers, color: '#FF1AC6' }
          ]}
          title={`${percentage}% de acerto`}
          subtitle={chartLabel}
        />
      </div>

      <h2 className="subtitle">Estatísticas gerais</h2>
      <div className="stat-card">
        <p className="title">{cardTitle2} <span>{count}</span></p>
        <p className="title">Porcentagem de acerto total por área:</p>
        {
          accuracyByArea.map((area, index) => (
            <div className="card-item-name" key={index}>{area.name}: <span className="card-item-value">{area.percentage}%</span></div>
          ))
        }
      </div>

      <SwitchBtn className="save-exit" onClick={redirectOnClick}>Sair e salvar</SwitchBtn>
    </main>
  )
}