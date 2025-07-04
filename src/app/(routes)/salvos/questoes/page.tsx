"use client";

import ReturnTitleSearchStructure from "@/component/structure/ReturnTitleSearch";
import { useListing } from "@/hook/request/useListing";
import { Listing } from "@/component/listing/Listing";
import Loading2 from "@global/overlay/popup/dialog/Loading2";
import { ItemSalvo as ListItemSalvo } from "@/component/listing/ItemSalvo";
import { useToggle } from "@/hook/useToggle";
import useSearch from "@/hook/useSearch";
import SearchBar from "@global/atomic/SearchBar";
import { UnderHeader } from "@global/overlay/drawer/UnderHeader";
import { QuestoesSalvos } from "@/type/Entities";

type Props = {};

export default function page({}: Props) {
  const { status: searchActive, toggle: toggleSearch } = useToggle();

  const { data, loading, error } = useListing<QuestoesSalvos>({
    entity: "questoes-salvos",
    needsAuthorization: true,
  });

  const { filteredData, searchTerm, setSearchTerm } = useSearch<QuestoesSalvos>({
    options: data.rows,
    keyParams: ["questoes_enunciado", "instituicoes_nome_instituicao_com_ano"],
  });

  return (
    <ReturnTitleSearchStructure title="Questões salvas" handleSearch={toggleSearch}>
      <UnderHeader open={searchActive} onClose={toggleSearch}>
        <SearchBar
          value={searchTerm || ""}
          onChange={(e) => {
            setSearchTerm(e);
          }}
        />
      </UnderHeader>
      <Listing<QuestoesSalvos>
        data={filteredData}
        loading={loading}
        error={error}
        loadingComponent={<Loading2 loading={loading} />}
        renderItem={(item) => (
          <ListItemSalvo
            subtitle={item.instituicoes_nome_instituicao_com_ano}
            title={item.questoes_enunciado}
            entity="questoes"
            entityId={item.questoes_salvos_id_questao}
          />
        )}
      />
    </ReturnTitleSearchStructure>
  );
}
