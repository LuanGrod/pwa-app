"use client";

import { useEffect, useState, unstable_ViewTransition as ViewTransition } from "react";
import Footer from "@component/footer/Footer";
import Header from "@global/header/PdfContent";
import { useViewing } from "@/hook/request/useViewing";
import { Viewing } from "../viewing/Viewing";
import Loading2 from "@global/overlay/popup/dialog/Loading2";
import Cookie from "@/cookie/Cookie";
import EdicaoSugerida from "../overlay/popup/dialog/EdicaoSugerida";
import useDialog from "@/hook/useDialog";
import useToggleAddRemove from "@/hook/useToggleAddRemove";
import LazyPdfVisualizer from "../pdf/LazyPdfVisualizer";

type EdicaoSugeridaProps = {
  conteudoName: string;
  formEntity: string;
  insertEntity: string;
};

type ToggleAddRemoveProps = {
  entity: string;
  idParamName: string;
  insertDataIdParamName: string;
  insertDataEntityParamName: string;
};

type Props = {
  entity: string;
  entityId: string;
  titleParamName: string;
  pdfParamName: string;
  edicaoSugerida: EdicaoSugeridaProps;
  ToggleAddRemove: ToggleAddRemoveProps;
};

export default function PdfContent({
  entity,
  entityId,
  titleParamName,
  pdfParamName,
  edicaoSugerida,
  ToggleAddRemove,
}: Props) {
  const uploadUrl = process.env.NEXT_PUBLIC_UPLOAD_URL;
  const { isOpen, toggleDialog } = useDialog({});
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const cookie = new Cookie();
    setUserId(cookie.getCookie("id") || "");
  }, []);

  const { data, setData, loading, error } = useViewing({
    entity: entity,
    id: entityId,
    needsAuthorization: true,
  });

  const insertData = {
    [`${ToggleAddRemove.insertDataEntityParamName}_${ToggleAddRemove.insertDataIdParamName}`]: entityId,
    [`${ToggleAddRemove.insertDataEntityParamName}_id_estudante`]: userId,
  };

  const { toggleAddRemove } = useToggleAddRemove({
    data,
    entity: ToggleAddRemove.entity,
    idParamName: ToggleAddRemove.idParamName,
    insertData,
    setData,
  });

  return (
    <>
      <ViewTransition default="handle">
        <Header
          title={data ? (data as any)[titleParamName] : ""}
          handleAddSugestion={toggleDialog}
          handleSave={toggleAddRemove}
          status={data && data[ToggleAddRemove.idParamName]}
        />
        <main className="content-wrapper header footer pdf">
          {isOpen && (
            <EdicaoSugerida
              onClose={toggleDialog}
              open={isOpen}
              estudanteId={userId}
              conteudoId={entityId}
              conteudoName={edicaoSugerida.conteudoName}
              formEntity={edicaoSugerida.formEntity}
              insertEntity={edicaoSugerida.insertEntity}
            />
          )}
          <Viewing
            data={data}
            loading={loading}
            error={error}
            loadingComponent={<Loading2 loading />}
            renderItem={(item: any) => <LazyPdfVisualizer fileUrl={`${uploadUrl}/${item[pdfParamName]}`} />}
          />
        </main>
      </ViewTransition>
      <Footer />
    </>
  );
}
