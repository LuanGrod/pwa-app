"use client";

import { Estudante as EstudanteType } from "@/type/Entities";
import UploadImage from "@global/component/atomic/UploadImage";
import Camera from "@global/component/icons/Camera";
import PerfilItem from "./PerfilItem";
import Editar from "@global/component/icons/Editar";
import Image from "next/image";
import { BrazilianDateFormatter } from "@global/formatter/date/Brazilian";
import { BrazilianPhoneFormatter } from "@global/formatter/phone/Brazilian";
import Logo from "../icon/Logo";
import useDialog from "@global/hook/overlay/useDialog";
import PerfilEdicao from "../overlay/drawer/PerfilEdicao";
import PerfilEdicaoSenha from "../overlay/drawer/PerfilEdicaoSenha";
import { Upload } from "@global/request/builder/api/Upload";
import { Update } from "@global/request/builder/Update";
import { useEstudante } from "@/store/EstudanteStore";
import { useUpload } from "@global/hook/request/useUpload";
import Loading2 from "@global/component/overlay/popup/dialog/Loading2";

type Props = {
  data: EstudanteType;
  setData: (data: EstudanteType) => void;
}

export default function Perfil({ data, setData }: Props) {
  const { isOpen: edicaoIsOpen, toggleDialog: edicaoToggleDialog } = useDialog()
  const { isOpen: edicaoSenhaIsOpen, toggleDialog: edicaoSenhaToggleDialog } = useDialog()
  const dateFormatter = new BrazilianDateFormatter();
  const phoneFormatter = new BrazilianPhoneFormatter();
  const { updateUrlImagem } = useEstudante()
  const { uploadFile, loading } = useUpload({
    entity: "estudantes",
    needsAuthorization: true,
  })

  const handleUpdate = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    const fileName = await uploadFile(file);

    if (fileName) {
      const requestBody = { estudantes_url_imagem: fileName };

      const update = new Update({
        entity: "estudantes3",
        body: requestBody,
      })

      await update.build(true);

      setData({ ...data, estudantes_url_imagem: fileName });
      updateUrlImagem(fileName);
    }
  }

  if (loading) return <Loading2 loading />

  return (
    <>
      <div className="pfp-wrapper">
        <div className="pfp">
          {
            data.estudantes_url_imagem ? (
              <UploadImage src={data.estudantes_url_imagem} alt="profile" className="image" width={200} height={200} priority />
            ) : (
              <Image src="/project/assets/avatar-mock.png" alt="profile" className="image" width={200} height={200} priority />
            )
          }
          <button className="btn-edit">
            <input type="file" name="teste" id="teste" style={{ display: "none" }} onChange={handleUpdate} />
            <label htmlFor="teste">
              <Camera size={20} className="camera-icon" />
            </label>
          </button>
        </div>
        <div className="title-wrapper">
          <h1 className="title">
            {data.estudantes_nome_completo}
          </h1>
          <button onClick={edicaoToggleDialog}>
            <Editar size={20} changeOnTheme />
          </button>
        </div>
      </div>
      <div className="perfil-info">
        <PerfilItem label="Email:" value={data.estudantes_email} />
        <PerfilItem label="Senha:" value={"********"} customClass="edit">
          <button onClick={edicaoSenhaToggleDialog}>
            <Editar size={18} changeOnTheme />
          </button>
        </PerfilItem>
        <PerfilItem label="Data de nascimento:" value={dateFormatter.format(data.estudantes_data_nascimento)} />
        <PerfilItem label="Whatsapp:" value={phoneFormatter.format(data.estudantes_whatsapp)} />
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