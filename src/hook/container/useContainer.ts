import { useMemo } from "react";

export const useContainer = () => {
  const cdnUrl = useMemo(() => process.env.PUBLIC_CDN_URL, []);
  const rootUrl = useMemo(() => process.env.PUBLIC_ROOT_URL, []);

  return { rootUrl, cdnUrl };
};
