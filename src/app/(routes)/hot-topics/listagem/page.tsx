"use client";
import { Listing } from "@/component/listing/Listing";
import ReturnTitleSearchStructure from "@/component/structure/ReturnTitleSearch";
import { useListing } from "@/hook/listing/useListing";
import { Item as ListItem } from "@/component/listing/Item";
import Loading2 from "@global/overlay/popup/dialog/Loading2";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { UnderHeader } from "@global/overlay/drawer/UnderHeader";
import SearchBar from "@global/atomic/SearchBar";
import useSearch from "@/hook/useSearch";

type Props = {};

type HotTopics = {
  hot_topics_id: string;
  hot_topics_nome: string;
  temas_nome: string;
  areas_url_imagem: string;
};

export default function page({}: Props) {
  const filters = useSearchParams().get("filters") || "";
  const [searchActive, setSearchActive] = useState(false);

  const handleSearch = () => {
    setSearchActive(!searchActive);
  };

  const { data, loading, error } = useListing<HotTopics>({
    entity: "hot-topics",
    params: { filters: filters },
    needsAuthorization: true,
  });

  const { filteredData, searchTerm, setSearchTerm } = useSearch<HotTopics>({
    options: data.rows,
    keyParams: ["hot_topics_nome", "temas_nome"],
  });

  return (
    <ReturnTitleSearchStructure title="Hot Topics" handleSearch={handleSearch}>
      <UnderHeader open={searchActive} onClose={() => setSearchActive(false)}>
        <SearchBar
          value={searchTerm || ""}
          onChange={(e) => {
            setSearchTerm(e);
          }}
        />
      </UnderHeader>
      <Listing<HotTopics>
        data={filteredData}
        loading={loading}
        error={error}
        loadingComponent={<Loading2 loading={loading} />}
        renderItem={(item) => (
          <ListItem
            href={`/hot-topics/${item.hot_topics_id}`}
            imageSrc={item.areas_url_imagem}
            subtitle={item.hot_topics_nome}
            title={item.temas_nome}
            hasViewed
            viewed={parseInt(item.hot_topics_id) % 2 === 0}
          />
        )}
      />
    </ReturnTitleSearchStructure>
  );
}
