import { PlaceholderValue, OnLoadingComplete, StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

type UploadImageProps = {
  src: string | import("next/dist/shared/lib/get-img-props").StaticImport;
  alt: string;
  className?: string;
  width?: number | `${number}`;
  height?: number | `${number}`;
  fill?: boolean;
  loader?: import("next/dist/shared/lib/get-img-props").ImageLoader;
  quality?: number | `${number}`;
  priority?: boolean;
  loading?: "eager" | "lazy" | undefined;
  placeholder?: PlaceholderValue;
  blurDataURL?: string;
  unoptimized?: boolean;
  overrideSrc?: string;
  onLoadingComplete?: OnLoadingComplete;
  layout?: string;
  objectFit?: string;
  objectPosition?: string;
  lazyBoundary?: string;
  lazyRoot?: string;
};

export default function UploadImage(props: UploadImageProps) {
  const uploadUrl = process.env.NEXT_PUBLIC_UPLOAD_URL;

  const { src, ...restProps } = props;

  return <Image src={`${uploadUrl}/${src}`} {...restProps} />;
}
