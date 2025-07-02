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

type Props = {};

type HotTopic = {
  hot_topics_salvos_id_hot_topic: string;
  hot_topics_nome: string;
  temas_nome: string;
  areas_nome: string;
};

export default function page({}: Props) {
  const { status: searchActive, toggle: toggleSearch } = useToggle();

  const { data, loading, error } = useListing<HotTopic>({
    entity: "hot-topics-salvos",
    needsAuthorization: true,
  });

  const { filteredData, searchTerm, setSearchTerm } = useSearch<HotTopic>({
    options: data.rows,
    keyParams: ["hot_topics_nome", "temas_nome", "areas_nome"],
  });

  return (
    <ReturnTitleSearchStructure title="Hot Topics salvos" handleSearch={toggleSearch}>
      <UnderHeader open={searchActive} onClose={toggleSearch}>
        <SearchBar
          value={searchTerm || ""}
          onChange={(e) => {
            setSearchTerm(e);
          }}
        />
      </UnderHeader>
      <Listing<HotTopic>
        data={filteredData}
        loading={loading}
        error={error}
        loadingComponent={<Loading2 loading={loading} />}
        renderItem={(item) => (
          <ListItemSalvo
            subtitle={`${item.areas_nome} - ${item.temas_nome}`}
            title={item.hot_topics_nome}
            entity="hot-topics"
            entityId={item.hot_topics_salvos_id_hot_topic}
          />
        )}
      />
    </ReturnTitleSearchStructure>
  );
}
