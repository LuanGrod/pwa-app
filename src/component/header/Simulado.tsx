"use client";


import useQuestoes from "@/store/QuestaoStore";
import { useUser } from "@global/hook/auth/useUser";
import useToggleStatus from "@global/hook/overlay/useToggleStatus";
import EdicaoSugerida from "@/component/overlay/popup/dialog/EdicaoSugerida";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BaseHeader from "@global/component/header/Base";
import DecreaseFontSizeBtn from "@global/component/header/item/DecreaseFontSizeBtn";
import EditBtn from "@global/component/header/item/EditBtn";
import IncreaseFontSizeBtn from "@global/component/header/item/IncreaseFontSizeBtn";
import SaveBtn from "@global/component/header/item/SaveBtn";

type Props = {};

export default function Simulado({ }: Props) {
  const { handleSave, getCurrentSavedStatus, getCurrent, isSaving, getRemainingTime, getFormattedRemainingTime, checkExamTimeout, _hasHydrated } = useQuestoes();
  const { id: userId } = useUser();
  const { isActive, toggle } = useToggleStatus();
  const router = useRouter();
  
  // Estado simples para o tempo restante - atualizado automaticamente
  const [currentRemainingTime, setCurrentRemainingTime] = useState({value: 0, formattedValue: ""});

  const RightWrapper = (
    <div className="flex">
      <IncreaseFontSizeBtn elementsClassNames={["enunciado", "area-tema", "ano", "conteudo", "gabarito", "alternativa", "comentario", "titulo-referencia", "referencia", "empty"]} />
      <DecreaseFontSizeBtn elementsClassNames={["enunciado", "area-tema", "ano", "conteudo", "gabarito", "alternativa", "comentario", "titulo-referencia", "referencia", "empty"]} />
      <SaveBtn handleSave={() => handleSave()} disabled={isSaving} status={getCurrentSavedStatus()} />
      <EditBtn handleEdit={toggle} size={24} />
    </div>
  );

  const remainingTime = () => {
    if (currentRemainingTime.value <= 0) {
      return <div></div>;
    }
    return (<div className="questao-timer">{currentRemainingTime.formattedValue}</div>)
  }

  useEffect(() => {
    // Se não hidratou ainda, não faz nada
    if (!_hasHydrated) {
      return;
    }

    // Atualiza o tempo restante imediatamente
    setCurrentRemainingTime({value: getRemainingTime(), formattedValue: getFormattedRemainingTime("detailed")});

    const updateInterval = setInterval(() => {
      const remaining = getRemainingTime();
      const formatted = getFormattedRemainingTime("detailed");
      setCurrentRemainingTime({value: remaining, formattedValue: formatted});

      if (remaining <= 0) {
        checkExamTimeout(router);
      }
    }, 10000);

    return () => {
      clearInterval(updateInterval);
    };
  }, [_hasHydrated, getRemainingTime, checkExamTimeout, router])

  return <>
    <BaseHeader left={remainingTime()} right={RightWrapper} className="questoes-header" />
    <EdicaoSugerida
      onClose={toggle}
      open={isActive}
      estudanteId={userId}
      conteudoId={getCurrent()?.questoes_id || ""}
      conteudoName="id_questao"
      formEntity="edicoes_sugeridas_questoes"
      insertEntity="edicoes-sugeridas-questoes"
    />
  </>;
}
