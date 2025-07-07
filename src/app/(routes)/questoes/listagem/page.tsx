"use client";

import Loading2 from "@global/overlay/popup/dialog/Loading2";
import { useSearchParams } from "next/navigation";
import { Viewing } from "@/component/viewing/Viewing";
import { Questao as QuestaoType } from "@/type/Entities";
import Questao from "@/component/Questao";
import useQuestoes from "@/store/QuestaoStore";
import EdicaoSugerida from "@/component/overlay/popup/dialog/EdicaoSugerida";
import IncreaseFontSizeBtn from "@global/header/item/IncreaseFontSizeBtn";
import DecreaseFontSizeBtn from "@global/header/item/DecreaseFontSizeBtn";
import SaveBtn from "@global/header/item/SaveBtn";
import EditBtn from "@global/header/item/EditBtn";
import MenuToggle from "@global/header/item/MenuToggle";
import ConfiguracoesDrawer from "@/component/overlay/drawer/Configuracoes";
import ReturnRoute from "@global/header/item/ReturnRoute";
import BaseHeader from "@global/header/Base";
import useDialog from "@/hook/overlay/useDialog";
import { useUser } from "@/hook/auth/useUser";
import SetaEsquerda from "@global/icons/SetaEsquerda";
import SetaDireita from "@global/icons/SetaDireita";
import { BottomDrawer } from "@global/overlay/drawer/Bottom";
import { useEffect, unstable_ViewTransition as ViewTransition } from "react";
import RespostaQuestao from "@/component/overlay/drawer/RespostaQuestao";
import AlertaQuestao from "@/component/overlay/drawer/AlertaQuestao";

type Props = {};

export default function page({ }: Props) {
  const filters = useSearchParams().get("filters") || "";
  const {
    index,
    nextIndex,
    previousIndex,
    getCurrentQuestao,
    countQuestoes,
    registerAnswer,
    handleSave,
    isShowingAnswer,
    toggleIsShowingAnswer,
    setQuestoesList,
    getCurrentQuestaoSavedStatus,
    questoesAnswers,
    getCurrentAnswer,
    isShowingAlert,
  } = useQuestoes();

  const { isOpen, toggleDialog } = useDialog();
  const { id: userId } = useUser();

  const data = [
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
      questoes_referencia_comentario: "lorem ipsum aaaaa bbb ccccccc d",
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
      questoes_referencia_comentario: "",
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
      questoes_referencia_comentario: "",
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
      questoes_referencia_comentario: "",
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
      questoes_referencia_comentario: "",
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
      questoes_referencia_comentario: "",
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
      questoes_referencia_comentario: "",
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
      questoes_referencia_comentario: "",
      questoes_url_imagem: "Screenshot%20from%202025-05-29%2010-51-32-47af7fca91dd663217384fadcd58c8ab.png",
      provas_ano: "2023",
      temas_nome: "Química",
      areas_nome: "Ciências da Natureza",
      questoes_salvos_id: "1008",
    },
  ]

  useEffect(() => {
    setQuestoesList(data);
  }, [])

  const RightWrapper = (
    <div className="flex">
      <IncreaseFontSizeBtn elementsClassNames={["enunciado", "area-tema", "ano", "conteudo", "gabarito", "alternativa", "comentario", "titulo-referencia", "referencia"]} />
      <DecreaseFontSizeBtn elementsClassNames={["enunciado", "area-tema", "ano", "conteudo", "gabarito", "alternativa", "comentario", "titulo-referencia", "referencia"]} />
      <SaveBtn handleSave={e => handleSave(userId)} status={getCurrentQuestaoSavedStatus()} />
      <EditBtn handleEdit={toggleDialog} size={24} />
      <MenuToggle menu={<ConfiguracoesDrawer />} iconSize={26} />
    </div>
  );

  return (
    <ViewTransition default="handle">
      <BaseHeader left={<ReturnRoute />} right={RightWrapper} className="questoes-header" />
      <main className="content-wrapper questoes">
        <Viewing
          data={getCurrentQuestao()}
          loading={false}
          error={""}
          loadingComponent={<Loading2 loading />}
          renderItem={(item: QuestaoType) => <Questao data={item} />}
        />
        {isOpen && (
          <EdicaoSugerida
            onClose={toggleDialog}
            open={isOpen}
            estudanteId={userId}
            conteudoId={getCurrentQuestao()?.questoes_id || ""}
            conteudoName="id_questao"
            formEntity="edicoes_sugeridas_questoes"
            insertEntity="edicoes-sugeridas-questoes"
          />
        )}
      </main>
      <footer className="questoes-footer">
        <div className="buttons">
          <button className="navigation" onClick={previousIndex} disabled={index === 0}>
            <SetaEsquerda size={23} changeOnTheme className="inverted" />
          </button>
          <div className="enviar-wrapper">
            <button className="enviar" onClick={(e) => registerAnswer(userId)}>
              VER RESPOSTA
            </button>
          </div>
          <button className="navigation" onClick={nextIndex} disabled={index + 1 >= countQuestoes()}>
            <SetaDireita size={23} changeOnTheme className="inverted" />
          </button>
        </div>
        <p className="summary">Q{index + 1} de {countQuestoes()}</p>
      </footer>
      <AlertaQuestao open={isShowingAlert} />
      <RespostaQuestao data={getCurrentQuestao()} open={isShowingAnswer} onClose={toggleIsShowingAnswer} />
    </ViewTransition>
  );
}
