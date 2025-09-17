"use client";

import Structure from "@/component/structure/ReturnTitleSearch";
import { useListing } from "@global/hook/request/useListing";
import { AsyncRenderer } from "@global/component/data/AsyncRenderer";
import Loading2 from "@global/component/overlay/popup/dialog/Loading2";
import { IconItem } from "@global/listing/IconItem";
import useSearch from "@global/hook/useSearch";
import SearchBar from "@global/component/search/bar/SearchBar";
import { UnderHeader } from "@global/component/overlay/drawer/UnderHeader";
import { QuestoesSalvos } from "@/type/Entities";
import useToggleStatus from "@global/hook/overlay/useToggleStatus";
import Bandeira from "@global/component/icon/Bandeira";

type Props = {};

export default function page({ }: Props) {
  const { isActive, toggle } = useToggleStatus();

  const { data, loading, error } = useListing<QuestoesSalvos>({
    entity: "questoes-salvos",
    needsAuthorization: true,
  });

  const { filteredData, searchTerm, setSearchTerm } = useSearch<QuestoesSalvos>({
    options: data.rows,
    keyParams: ["questoes_enunciado", "instituicoes_nome_instituicao_com_ano"],
  });

  return (
    <Structure title="Questões salvas" handleSearch={toggle}>
      <UnderHeader open={isActive} onClose={toggle}>
        <SearchBar
          value={searchTerm || ""}
          onChange={(e) => {
            setSearchTerm(e);
          }}
        />
      </UnderHeader>
      <AsyncRenderer<QuestoesSalvos>
        data={filteredData}
        loading={loading}
        error={error}
        loadingComponent={<Loading2 loading={loading} />}
        renderItem={(item) => (
          <IconItem
            subtitle={item.instituicoes_nome_instituicao_com_ano}
            title={item.questoes_enunciado}
            entity="questoes"
            entityId={item.questoes_salvos_id_questao}
            icon={<Bandeira size={25} className="logo" />}
          />
        )}
      />
    </Structure>
  );
}
