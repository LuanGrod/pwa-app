import { useMemo } from "react";

export const useContainer = () => {
  const cdnUrl = useMemo(() => process.env.NEXT_PUBLIC_CDN_URL, []);
  const rootUrl = useMemo(() => process.env.NEXT_PUBLIC_ROOT_URL, []);

  return { rootUrl, cdnUrl };
};
