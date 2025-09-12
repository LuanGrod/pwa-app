type Props = {
  title: string;
  paragraphs: string[];
  listItems: string[];
};

export default function HowToStudyContent({ listItems, paragraphs, title }: Props) {
  return (
    <>
      <h2 className="how-to-study-title">{title}</h2>
      <div className="how-to-study-content">
        {paragraphs.map((item, index) => (
          <p className="paragraph" key={index}>{item}</p>
        ))}
        <ul>
          {listItems.map((item, index) => (
            <li className="list-item" key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
