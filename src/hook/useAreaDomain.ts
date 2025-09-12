import { useMemo } from "react";

type Props = {
  opt: any;
};

export default function useAreaDomain({ opt }: Props) {
  const areaDomain = useMemo(() => {
    if (!opt.children || opt.children.length === 0) return 0;

    const totalDomain = opt.children.reduce((sum: number, child: any) => {
      return sum + (Number(child.domain) || 0);
    }, 0);

    return Math.round(totalDomain / opt.children.length);
  }, [opt.children]);

  return areaDomain;
}
