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
        {paragraphs.map((item, index) => (
          <p className={styles.contentParagraph} key={index}>{item}</p>
        ))}
        <ul>
          {listItems.map((item, index) => (
            <li className={styles.contentListItem} key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
