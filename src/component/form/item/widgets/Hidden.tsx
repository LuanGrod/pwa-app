type Props = {
  name: string;
  id: string;
  value: any;
};

export default function HiddenWidget({ id, name, value }: Props) {
  return <input type="hidden" name={name} id={id} value={value} />;
}
