"use client";

import ReturnTitleSearchStructure from "@/component/structure/ReturnTitleSearch";
import { useListing } from "@global/hook/request/useListing";
import { Listing } from "@global/component/listing/Listing";
import Loading2 from "@global/component/overlay/popup/dialog/Loading2";
import { ItemSalvo as ListItemSalvo } from "@/component/listing/ItemSalvo";
import { useToggle } from "@global/hook/useToggle";
import useSearch from "@global/hook/useSearch";
import SearchBar from "@global/component/atomic/SearchBar";
import { UnderHeader } from "@global/component/overlay/drawer/UnderHeader";
import { MapasMentaisSalvos } from "@/type/Entities";

type Props = {};

export default function page({}: Props) {
  const { status: searchActive, toggle: toggleSearch } = useToggle();

  const { data, loading, error } = useListing<MapasMentaisSalvos>({
    entity: "mapas-mentais-salvos",
    needsAuthorization: true,
  });

  const { filteredData, searchTerm, setSearchTerm } = useSearch<MapasMentaisSalvos>({
    options: data.rows,
    keyParams: ["mapas_mentais_nome", "temas_nome", "areas_nome"],
  });

  return (
    <ReturnTitleSearchStructure title="Mapas Mentais salvos" handleSearch={toggleSearch}>
      <UnderHeader open={searchActive} onClose={toggleSearch}>
        <SearchBar
          value={searchTerm || ""}
          onChange={(e) => {
            setSearchTerm(e);
          }}
        />
      </UnderHeader>
      <Listing<MapasMentaisSalvos>
        data={filteredData}
        loading={loading}
        error={error}
        loadingComponent={<Loading2 loading={loading} />}
        renderItem={(item) => (
          <ListItemSalvo
            subtitle={`${item.areas_nome} - ${item.temas_nome}`}
            title={item.mapas_mentais_nome}
            entity="mapas-mentais"
            entityId={item.mapas_mentais_salvos_id_mapa_mental}
          />
        )}
      />
    </ReturnTitleSearchStructure>
  );
}
