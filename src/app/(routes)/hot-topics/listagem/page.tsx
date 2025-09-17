"use client";

import { Listing } from "@global/component/listing/Listing";
import Structure from "@/component/structure/ReturnTitleSearch";
import { useListing } from "@global/hook/request/useListing";
import Loading2 from "@global/component/overlay/popup/dialog/Loading2";
import { useSearchParams } from "next/navigation";
import { UnderHeader } from "@global/component/overlay/drawer/UnderHeader";
import SearchBar from "@global/component/search/SearchBar";
import useSearch from "@global/hook/useSearch";
import { HotTopicsListagem } from "@/type/Entities";
import { ToggleableItem } from "@global/listing/ToggleableItem";
import useToggleStatus from "@global/hook/overlay/useToggleStatus";
import Estrela from "@global/component/icon/Estrela";

type Props = {};

export default function page({ }: Props) {
  const filters = useSearchParams().get("filters") || "";
  const { isActive, toggle } = useToggleStatus();

  const { data, loading, error } = useListing<HotTopicsListagem>({
    entity: "hot-topics",
    params: { filters: filters },
    needsAuthorization: true,
  });

  const { filteredData, setFilteredData, searchTerm, setSearchTerm } = useSearch<HotTopicsListagem>({
    options: data.rows,
    keyParams: ["hot_topics_nome", "temas_nome"]
  });

  return (
    <Structure title="Hot Topics" handleSearch={toggle} href="/hot-topics">
      <UnderHeader open={isActive} onClose={toggle}>
        <SearchBar
          value={searchTerm || ""}
          onChange={(e) => {
            setSearchTerm(e);
          }}
        />
      </UnderHeader>
      <Listing<HotTopicsListagem>
        data={filteredData}
        loading={loading}
        error={error}
        loadingComponent={<Loading2 loading={loading} />}
        renderItem={(item) => (
          <ToggleableItem
            data={item}
            setData={setFilteredData}
            entity="hot-topics"
            entityId={item.hot_topics_id}
            imageSrc={item.areas_url_imagem}
            subtitle={item.hot_topics_nome}
            title={item.temas_nome}
            viewed={!!item.hot_topics_estudantes_id}
            icon={<Estrela size={26} changeOnTheme className="status" />}
            toggleConfig={{
              entity: "hot-topics-estudantes",
              idParamName: "hot_topics_estudantes_id",
              keyParamName: "hot_topics_id",
              insertDataConfig: {
                entityIdField: "hot_topics_estudantes_id_hot_topic",
                userIdField: "hot_topics_estudantes_id_estudante",
              },
            }}
          />
        )}
      />
    </Structure>

  );
}
