import BaseHeader from "@global/component/header/Base";
import EditBtn from "@global/component/header/item/EditBtn";
import ReturnRoute from "@global/component/header/item/ReturnRoute";
import SaveBtn from "@global/component/header/item/SaveBtn";

type Props = {
  title: string;
  handleSave?: () => void;
  handleAddSugestion?: () => void;
  status: boolean;
  isSaving?: boolean;
};

export default function PdfContent({ title, handleAddSugestion, handleSave, status, isSaving }: Props) {
  const RightWrapper = (
    <div className="flex">
      <SaveBtn handleSave={handleSave} status={status} disabled={isSaving} />
      <EditBtn handleEdit={handleAddSugestion} />
    </div>
  );

  return (
    <BaseHeader
      left={<ReturnRoute />}
      center={<p className="pdf-content title">{title}</p>}
      right={RightWrapper}
    />
  );
}
