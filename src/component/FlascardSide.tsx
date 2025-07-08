import UploadImage from "@global/atomic/UploadImage";
import EditBtn from "@global/header/item/EditBtn";
import SaveBtn from "@global/header/item/SaveBtn";
import Logo from "./icon/Logo";
import EdicaoSugerida from "./overlay/popup/dialog/EdicaoSugerida";

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
}: Props) {
  return (
    <div className={side}>
      <div className="header">
        <Logo size={30} className="actions" color={logoColor} changeOnTheme={!logoColor} />
        <div className="card-title">MedRQE</div>
        <div className="actions">
          <SaveBtn handleSave={handleSave} status={status} />
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
