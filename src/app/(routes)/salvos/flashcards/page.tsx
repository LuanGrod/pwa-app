"use client";

import Structure from "@/component/structure/ReturnTitleSearch";
import { useListing } from "@global/hook/request/useListing";
import { Listing } from "@global/component/listing/Listing";
import Loading2 from "@global/component/overlay/popup/dialog/Loading2";
import { ItemSalvo as ListItemSalvo } from "@global/listing/IconItem";
import useSearch from "@global/hook/useSearch";
import SearchBar from "@global/component/atomic/SearchBar";
import { UnderHeader } from "@global/component/overlay/drawer/UnderHeader";
import { FlashcardsSalvos } from "@/type/Entities";
import useDialog from "@global/hook/overlay/useDialog";

type Props = {};

export default function page({ }: Props) {
  const { isOpen, toggleDialog } = useDialog();

  const { data, loading, error } = useListing<FlashcardsSalvos>({
    entity: "flashcards-salvos",
    needsAuthorization: true,
  });

  const { filteredData, searchTerm, setSearchTerm } = useSearch<FlashcardsSalvos>({
    options: data.rows,
    keyParams: ["flashcards_pergunta", "temas_nome", "areas_nome"],
  });

  return (
    <Structure title="Flashcards salvos" handleSearch={toggleDialog}>
      <UnderHeader open={isOpen} onClose={toggleDialog}>
        <SearchBar
          value={searchTerm || ""}
          onChange={(e) => {
            setSearchTerm(e);
          }}
        />
      </UnderHeader>
      <Listing<FlashcardsSalvos>
        data={filteredData}
        loading={loading}
        error={error}
        loadingComponent={<Loading2 loading={loading} />}
        renderItem={(item) => (
          <ListItemSalvo
            subtitle={`${item.areas_nome} - ${item.temas_nome}`}
            title={item.flashcards_pergunta}
            entity="flashcards"
            entityId={item.flashcards_salvos_id_flashcard}
          />
        )}
      />
    </Structure>
  );
}
