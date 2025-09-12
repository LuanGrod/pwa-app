type Props = {
  selected: any;
  parent: any;
  child: any;
  filterKey: string;
  optionId: string;
  parentKey: string;
  parentOptionId: string;
};

export default function useCheckChildSelected({
  selected,
  filterKey,
  optionId,
  parent,
  child,
  parentKey,
  parentOptionId,
}: Props) {
  return (
    selected[filterKey].includes(child[optionId]) ||
    selected[parentKey].includes(parent[parentOptionId])
  );
}
