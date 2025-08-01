import UploadImage from "@global/component/atomic/UploadImage";
import EditBtn from "@global/component/header/item/EditBtn";
import SaveBtn from "@global/component/header/item/SaveBtn";
import Logo from "../icon/Logo";
import EdicaoSugerida from "../overlay/popup/dialog/EdicaoSugerida";
import useFlashcards from "@/store/FlashcardStore";

type Props = {
  side: "front" | "back";
  logoColor?: string;
  handleSave: (userId: string) => Promise<null | undefined>;
  toggleDialog: () => void;
  status: boolean;
  isOpen: boolean;
  userId: string;
  conteudoId: string;
  title: string;
  text: string;
  imageUrl?: string;
  header: string;
};

export default function FlashcardSide({
  logoColor,
  conteudoId,
  handleSave,
  isOpen,
  side,
  status,
  text,
  title,
  toggleDialog,
  userId,
  imageUrl,
  header,
}: Props) {
  const { isSaving } = useFlashcards();

  return (
    <div className={side}>
      <div className="header">
        <Logo size={30} className="actions" color={logoColor} changeOnTheme={!logoColor} />
        <div className="card-title">MedRQE</div>
        {/* <div className="card-title">{header}</div> */}
        <div className="actions">
          <SaveBtn disabled={isSaving} handleSave={handleSave} status={status} />
          <EditBtn handleEdit={toggleDialog} />
        </div>
        {isOpen && (
          <EdicaoSugerida
            onClose={toggleDialog}
            open={isOpen}
            estudanteId={userId}
            conteudoId={conteudoId}
            conteudoName="id_flashcard"
            formEntity="edicoes_sugeridas_flashcards"
            insertEntity="edicoes-sugeridas-flashcards"
          />
        )}
      </div>
      <div className="content">
        <h1 className="title">{title}</h1>
        <p className="text">{text}</p>
        {imageUrl && <UploadImage src={imageUrl} width={284} height={284} alt={title} className="image" />}
      </div>
      <div className="footer"></div>
    </div>
  );
}
