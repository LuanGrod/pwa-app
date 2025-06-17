import ReturnTitleSearchStructure from "@/component/structure/ReturnTitleSearch";
import styles from "./page.module.css";
import { cookies } from "next/headers";
import { Item as ListItem } from "@/component/listing/Item";
import Questoes from "@/component/listing/Questoes";

type Props = {};

export default async function page({}: Props) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const response = await fetch("https://sistemasclientes.com.br/projetos/api-medrqe/questoes-salvos", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return <div>Erro ao carregar questões</div>;
  }

  const questoes = await response.json();

  return (
    <ReturnTitleSearchStructure title="Salvos">
      <div className={styles.container}>
        <Questoes/>
        {/* {questoes.rows.map((questao: any) => (
          <ListItem
            key={questao.questoes_salvos_id_questao}
            href={`/questoes/${questao.questoes_salvos_id_questao}`}
            imageSrc={`https://sistemasclientes.com.br/projetos/medrqe/uploads/${questao.areas_url_imagem}`}
            subtitle={questao.questoes_enunciado}
            title={questao.temas_nome}
          />
        ))} */}
      </div>
    </ReturnTitleSearchStructure>
  );
}
