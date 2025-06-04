import { p } from "motion/react-client";
import styles from "./HowToStudyContent.module.css";

type Props = {
  title: string;
  paragraphs: string[];
  listItems: string[];
};

export default function HowToStudyContent({ listItems, paragraphs, title }: Props) {
  return (
    <>
      <h2 className={styles.contentTitle}>{title}</h2>
      <div className={styles.contentWrapper}>
        {paragraphs.map((item) => (
          <p className={styles.contentParagraph}>{item}</p>
        ))}
        <ul>
          {listItems.map((item) => (
            <li className={styles.contentListItem}>{item}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
