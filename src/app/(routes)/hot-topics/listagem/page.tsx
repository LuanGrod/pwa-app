"use client";

import { Listing } from "@/component/listing/Listing";
import ReturnTitleSearchStructure from "@/component/structure/ReturnTitleSearch";
import { useListing } from "@/hook/request/useListing";
import { Item as ListItem } from "@/component/listing/Item";
import Loading2 from "@global/overlay/popup/dialog/Loading2";
import { useSearchParams } from "next/navigation";
import { UnderHeader } from "@global/overlay/drawer/UnderHeader";
import SearchBar from "@global/atomic/SearchBar";
import useSearch from "@/hook/useSearch";
import { useToggle } from "@/hook/useToggle";
import { HotTopicsListagem } from "@/type/Entities";
import { Profiler, StrictMode } from "react";

type Props = {};

export default function page({ }: Props) {
  const filters = useSearchParams().get("filters") || "";
  const { status: searchActive, toggle: toggleSearch } = useToggle();

  const { data, setData, loading, error } = useListing<HotTopicsListagem>({
    entity: "hot-topics",
    params: { filters: filters },
    needsAuthorization: true,
  });

  const { filteredData, setFilteredData, searchTerm, setSearchTerm } = useSearch<HotTopicsListagem>({
    options: data.rows,
    keyParams: ["hot_topics_nome", "temas_nome"],
  });


  const onRender = (id: any, phase: any, actualDuration: any, baseDuration: any, startTime: any, commitTime: any) => {
    console.log({
      id,
      phase,
      actualDuration,
      baseDuration,
      startTime,
      commitTime,
    })
  }

  return (
    <ReturnTitleSearchStructure title="Hot Topics" handleSearch={toggleSearch}>
      <UnderHeader open={searchActive} onClose={toggleSearch}>
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
          <ListItem
            data={item}
            setData={setFilteredData}
            entity="hot-topics"
            entityId={item.hot_topics_id}
            imageSrc={item.areas_url_imagem}
            subtitle={item.hot_topics_nome}
            title={item.temas_nome}
            hasViewed
            viewed={!!item.hot_topics_estudantes_id}
            ToggleAddRemove={{
              entity: "hot-topics-estudantes",
              idParamName: "hot_topics_estudantes_id",
              keyParamName: "hot_topics_id",
              insertDataIdParamName: "id_hot_topic",
              insertDataEntityParamName: "hot_topics_estudantes",
            }}
          />
        )}
      />
    </ReturnTitleSearchStructure>

  );
}
