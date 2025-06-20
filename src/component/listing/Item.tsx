import { LinkView } from "../LinkView";
import UploadImage from "@global/atomic/UploadImage";

type Props = {
  href: string;
  imageSrc: string;
  title: string;
  subtitle: string;
  hasViewed?: boolean;
  viewed?: boolean;
};

export function Item({ href, imageSrc, subtitle, title, hasViewed = false, viewed = false }: Props) {
  return (
    <LinkView href={href} className="list-item-wrapper">
      <div className="content">
        <UploadImage className="image" alt={title} src={imageSrc} width={45} height={45} />
        <div className="title-wrapper">
          <p className="title">{title}</p>
          <p className="subtitle">{subtitle}</p>
        </div>
      </div>
      {hasViewed && <div className={`viewed ${viewed ? "active" : ""}`}></div>}
    </LinkView>
  );
}
