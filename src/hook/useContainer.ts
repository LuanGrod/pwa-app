export const useContainer = () => {
  const cdnUrl = process.env.NEXT_PUBLIC_CDN_URL;
  const rootUrl = process.env.NEXT_PUBLIC_ROOT_URL;
  const uploadUrl = process.env.NEXT_PUBLIC_UPLOAD_URL;

  return { rootUrl, cdnUrl, uploadUrl };
};
