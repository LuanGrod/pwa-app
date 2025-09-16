import { Estudante as EstudanteType } from "@/type/Entities";
import Form from "@global/component/form/Form";
import { BottomDrawer } from "@global/component/overlay/drawer/Bottom"
import { UpdateHandler } from "@global/form/handler/submit/api/UpdateHandler";
import EditarSenha from "@/form/EditarSenha";

type Props = {
  open: boolean;
  onClose: () => void;
}

export default function PerfilEdicaoSenha({ open, onClose }: Props) {
  const submitHandler = new UpdateHandler({ entity: "estudantes2", needsAuthorization: true });

  return (
    <BottomDrawer open={open} onClose={onClose} title="Editar senha">
      <Form formConfig={EditarSenha} submitHandler={submitHandler} submitLabel="SALVAR" />
    </BottomDrawer>
  )
}