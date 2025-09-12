import { useMemo } from "react";

type Props = {
  child: any;
};

export default function useTemaDomain({ child }: Props) {
  const temaDomain = useMemo(() => {
    return Number(child.domain) || 0;
  }, [child.domain]);

  return temaDomain;
}
