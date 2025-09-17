"use client";

import Structure from "@/component/structure/ReturnTitleSearch";
import { useListing } from "@global/hook/request/useListing";
import { AsyncRenderer } from "@global/component/data/AsyncRenderer";
import Loading2 from "@global/component/overlay/popup/dialog/Loading2";
import { IconItem } from "@global/listing/IconItem";
import useSearch from "@global/hook/useSearch";
import SearchBar from "@global/component/search/bar/SearchBar";
import { UnderHeader } from "@global/component/overlay/drawer/UnderHeader";
import { MapasMentaisSalvos } from "@/type/Entities";
import useToggleStatus from "@global/hook/overlay/useToggleStatus";
import Bandeira from "@global/component/icon/Bandeira";

type Props = {};

export default function page({ }: Props) {
  const { isActive, toggle } = useToggleStatus();

  const { data, loading, error } = useListing<MapasMentaisSalvos>({
    entity: "mapas-mentais-salvos",
    needsAuthorization: true,
  });

  const { filteredData, searchTerm, setSearchTerm } = useSearch<MapasMentaisSalvos>({
    options: data.rows,
    keyParams: ["mapas_mentais_nome", "temas_nome", "areas_nome"],
  });

  return (
    <Structure title="Mapas Mentais salvos" handleSearch={toggle}>
      <UnderHeader open={isActive} onClose={toggle}>
        <SearchBar
          value={searchTerm || ""}
          onChange={(e) => {
            setSearchTerm(e);
          }}
        />
      </UnderHeader>
      <AsyncRenderer<MapasMentaisSalvos>
        data={filteredData}
        loading={loading}
        error={error}
        loadingComponent={<Loading2 loading={loading} />}
        renderItem={(item) => (
          <IconItem
            subtitle={`${item.areas_nome} - ${item.temas_nome}`}
            title={item.mapas_mentais_nome}
            entity="mapas-mentais"
            entityId={item.mapas_mentais_salvos_id_mapa_mental}
            icon={<Bandeira size={25} className="logo" />}
          />
        )}
      />
    </Structure>
  );
}
