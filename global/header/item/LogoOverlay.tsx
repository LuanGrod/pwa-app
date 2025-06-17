import Logo from "@/component/icon/Logo";

type Props = {};

export default function LogoOverlay({}: Props) {
  return (
    <div className="btn overlay">
      <Logo size={25} />
    </div>
  );
}
