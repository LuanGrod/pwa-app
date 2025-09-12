import styles from "./page.module.css";
import GerarNovaSenha from "@global/component/form/GerarNovaSenha";

type Props = {};

export default function page({ }: Props) {
  return (
    <div className="geracao-nova-senha-container">
      <div className="description">
        <h1 className="title">Defina uma nova senha</h1>
        <h2 className="subtitle">
          Crie uma nova senha. Para sua segurança, certifique-se de que ela seja diferente das anteriores.
        </h2>
      </div>
      <GerarNovaSenha />
    </div>
  );
}
