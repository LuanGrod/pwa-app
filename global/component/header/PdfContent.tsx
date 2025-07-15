import ReturnRoute from "./item/ReturnRoute";
import BaseHeader from "./Base";
import EditBtn from "./item/EditBtn";
import SaveBtn from "./item/SaveBtn";

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
