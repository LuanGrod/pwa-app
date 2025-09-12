"use client";

import Structure from "@/component/structure/ReturnTitleSearch";
import { useListing } from "@global/hook/request/useListing";
import { Listing } from "@global/component/listing/Listing";
import Loading2 from "@global/component/overlay/popup/dialog/Loading2";
import { IconItem } from "@global/listing/IconItem";
import useSearch from "@global/hook/useSearch";
import SearchBar from "@global/component/atomic/SearchBar";
import { UnderHeader } from "@global/component/overlay/drawer/UnderHeader";
import { HotTopicSalvos } from "@/type/Entities";
import useDialog from "@global/hook/overlay/useDialog";
import Bandeira from "@global/component/icons/Bandeira";

type Props = {};

export default function page({ }: Props) {
  const { isOpen, toggleDialog } = useDialog();

  const { data, loading, error } = useListing<HotTopicSalvos>({
    entity: "hot-topics-salvos",
    needsAuthorization: true,
  });

  const { filteredData, searchTerm, setSearchTerm } = useSearch<HotTopicSalvos>({
    options: data.rows,
    keyParams: ["hot_topics_nome", "temas_nome", "areas_nome"],
  });

  return (
    <Structure title="Hot Topics salvos" handleSearch={toggleDialog}>
      <UnderHeader open={isOpen} onClose={toggleDialog}>
        <SearchBar
          value={searchTerm || ""}
          onChange={(e) => {
            setSearchTerm(e);
          }}
        />
      </UnderHeader>
      <Listing<HotTopicSalvos>
        data={filteredData}
        loading={loading}
        error={error}
        loadingComponent={<Loading2 loading={loading} />}
        renderItem={(item) => (
          <IconItem
            subtitle={`${item.areas_nome} - ${item.temas_nome}`}
            title={item.hot_topics_nome}
            entity="hot-topics"
            entityId={item.hot_topics_salvos_id_hot_topic}
            icon={<Bandeira size={25} className="logo" />}
          />
        )}
      />
    </Structure>
  );
}
