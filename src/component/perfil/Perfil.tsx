"use client";

import { Estudante as EstudanteType } from "@/type/Entities";
import UploadImage from "@global/component/image/UploadImage";
import Camera from "@global/component/icon/Camera";
import PerfilItem from "./PerfilItem";
import Caneta from "@global/component/icon/Caneta";
import Image from "next/image";
import { BrazilianDateFormatter } from "@global/formatter/date/Brazilian";
import { BrazilianPhoneFormatter } from "@global/formatter/phone/Brazilian";
import Logo from "../icon/Logo";
import useToggleStatus from "@global/hook/overlay/useToggleStatus";
import PerfilEdicao from "../overlay/drawer/PerfilEdicao";
import PerfilEdicaoSenha from "../overlay/drawer/PerfilEdicaoSenha";
import { Upload } from "@global/request/builder/api/Upload";
import { useEstudante } from "@/store/EstudanteStore";
import { Upload as UploadResponseHandler } from "@global/request/response/handler/api/Upload";
import UpdateOnUploadFile from "@global/request/response/handler/action/UpdateOnUploadFile";
import Fechar from "@global/component/icon/Fechar";
import { Update } from "@global/request/builder/api/Update";

type Props = {
  data: EstudanteType;
  setData: (data: EstudanteType) => void;
}

export default function Perfil({ data, setData }: Props) {
  const { isActive: edicaoIsOpen, toggle: edicaoToggleDialog } = useToggleStatus()
  const { isActive: edicaoSenhaIsOpen, toggle: edicaoSenhaToggleDialog } = useToggleStatus()
  const dateFormatter = new BrazilianDateFormatter();
  const phoneFormatter = new BrazilianPhoneFormatter();
  const { updateUrlImagem } = useEstudante()

  const handleUpdatePfp = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      let formData = new FormData();

      formData.append("estudantes_url_imagem", file);
      formData.append("profile", "image");

      const upload = new Upload({
        entity: "estudantes",
        body: formData,
        uploadField: "url-imagem",
        responseHandler: new UploadResponseHandler({
          onSuccessActions: [new UpdateOnUploadFile("estudantes3", "estudantes_url_imagem", data, setData, updateUrlImagem)]
        })
      });

      await upload.build(true);
    }
  }

  const handleDelete = async () => {
    if (!data.estudantes_url_imagem) return;

    const formData = {
      estudantes_url_imagem: ""
    }

    const update = new Update({
      entity: "estudantes3",
      body: formData,
      responseHandler: new UploadResponseHandler({
        onSuccessCallback: () => {
          setData({
            ...data,
            estudantes_url_imagem: ""
          });
          updateUrlImagem("");
        },
      })
    });

    await update.build(true);

  }

  return (
    <>
      <div className="pfp-wrapper">
        <div className="pfp">
          {
            data.estudantes_url_imagem ? (
              <UploadImage src={data.estudantes_url_imagem} alt="profile" className="image" width={200} height={200} priority />
            ) : (
              <Image src="/project/assets/avatar-mock.webp" alt="profile" className="image" width={200} height={200} priority />
            )
          }
          <button className="btn-edit">
            <input type="file" name="teste" id="teste" style={{ display: "none" }} onChange={handleUpdatePfp} />
            <label htmlFor="teste">
              <Camera size={20} className="camera-icon" />
            </label>
          </button>
          <button className="btn-delete" onClick={handleDelete}>
            <Fechar size={14} className="camera-icon" />
          </button>
        </div>
        <div className="title-wrapper">
          <h1 className="title">
            {data.estudantes_nome_completo}
          </h1>
          <button onClick={edicaoToggleDialog}>
            <Caneta size={20} changeOnTheme />
          </button>
        </div>
      </div>
      <div className="perfil-info">
        <PerfilItem label="Email:" value={data.estudantes_email} />
        <PerfilItem label="Senha:" value={"********"} className="edit">
          <button onClick={edicaoSenhaToggleDialog}>
            <Caneta size={18} changeOnTheme />
          </button>
        </PerfilItem>
        <PerfilItem label="Data de nascimento:" value={dateFormatter.format(data.estudantes_data_nascimento)} />
        <PerfilItem label="Whatsapp:" value={phoneFormatter.format(data.estudantes_whatsapp)} />
        <PerfilItem label="Instagram:" value={data.estudantes_nome_instagram} />
        <PerfilItem label="Instituições de interesse:" value={data.estudantes_instituicoes_interesse} />
        <PerfilItem label="Especialidade-alvo:" value={data.estudantes_especialidade} />
      </div>
      <div className="logo-wrapper">
        <Logo size={32} className="logo" />
      </div>
      <PerfilEdicao data={data} open={edicaoIsOpen} onClose={edicaoToggleDialog} setData={setData} />
      <PerfilEdicaoSenha open={edicaoSenhaIsOpen} onClose={edicaoSenhaToggleDialog} />
    </>
  )
}