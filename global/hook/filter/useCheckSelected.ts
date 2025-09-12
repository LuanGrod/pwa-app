type Props = {
  selected: any;
  opt: any;
  filterKey: string;
  optionId: string;
};

export default function useCheckSelected({ selected, filterKey, optionId, opt }: Props) {
  return selected[filterKey].includes(opt[optionId]);
}
