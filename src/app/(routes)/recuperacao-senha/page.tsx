import Structure from "@/component/structure/Return";
import RecuperacaoSenha from "@/component/form/RecuperacaoSenha";

type Props = {};

export default function page({}: Props) {
  return (
    <Structure>
      <div className="recuperacao-senha-container">
        <div className="description">
          <h1 className="title">Esqueci a senha</h1>
          <h2 className="subtitle">
            Entre com seu e-mail para alterar a senha. Enviaremos um link de recuperação.
          </h2>
        </div>
        <RecuperacaoSenha/>
      </div>
    </Structure>
  );
}
