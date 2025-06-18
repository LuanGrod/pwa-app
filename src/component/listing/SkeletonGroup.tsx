type Props = {};

export default function SkeletonGroup({}: Props) {
  return (
    <div className="list-item-wrapper skeleton">
      {Array.from({ length: 10 }).map((_, index) => (
        <div className="content" key={index}>
          <div className="image"></div>
          <div className="title-wrapper">
            <p className="title"></p>
            <p className="subtitle"></p>
          </div>
        </div>
      ))}
    </div>
  );
}
