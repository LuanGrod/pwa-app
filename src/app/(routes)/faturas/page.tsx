"use client";

import Fatura from "@/component/fatura/Fatura";
import Structure from "@/component/structure/ReturnTitle";
import { Fatura as FaturaType } from "@/type/Entities";
import Loading2 from "@global/component/overlay/popup/dialog/Loading2";
import { AsyncRenderer } from "@global/component/data/AsyncRenderer";
import { BrazilianDateFormatter } from "@global/formatter/date/Brazilian";
import { useListing } from "@global/hook/request/useListing";

type Props = {};

export default function page({ }: Props) {
  const { data, loading, error } = useListing<FaturaType>({
    entity: "faturas",
    needsAuthorization: true,
  });

  let inicioVigencia = data.rows[0]?.estudantes_inicio_vigencia_plano || "";
  let vencimento = data.rows[0]?.faturas_vencimento_plano || "";
  let periodo = data.rows[0]?.periodos_planos_periodo;

  const dateFormatter = new BrazilianDateFormatter();

  return (
    <Structure title="Faturas" className="faturas">
      <div className="fatura-wrapper">
        <h2 className="title">Meu plano</h2>
        <div className="plano-wrapper">
          <div className="periodo">
            <p className="number">
              {periodo === "Semestral" ? "6" : periodo === "Anual" ? "12" : "2"}
            </p>
            <p className="label">
              {periodo === "Semestral" || periodo === "Anual" ? "Meses" : "Anos"}
            </p>
          </div>
          <div className="divider"></div>
          <div className="info-wrapper">
            <div className="info">
              <p className="label">Data de assinatura:</p>
              <p className="value">{dateFormatter.format(inicioVigencia)}</p>
            </div>
            <div className="info">
              <p className="label">Data de validade:</p>
              <p className="value">{dateFormatter.format(vencimento)}</p>
            </div>
          </div>
        </div>
        <h2 className="title">Faturas</h2>
        <div className="fatura-list">
          <AsyncRenderer
            data={data.rows}
            loading={loading}
            error={error}
            loadingComponent={<Loading2 loading />}
            renderItem={(item) => (
              <Fatura key={item.faturas_id} item={item} />
            )}
          />
        </div>
      </div>
    </Structure>
  );
}
