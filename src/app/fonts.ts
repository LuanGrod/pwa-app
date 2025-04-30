import localFont from "next/font/local";

export const comfortaa = localFont({
  src: [
    {
      path: "../../public/fonts/Comfortaa/Comfortaa-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Comfortaa/Comfortaa-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-comfortaa",
  display: "swap",
  fallback: ["ui-monospace", "monospace"],
});

export const sfProDisplay = localFont({
  src: [
    {
      path: "../../public/fonts/SF-Pro/Display/sf-pro-display-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/SF-Pro/Display/sf-pro-display-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sfpro-display",
  display: "swap",
  fallback: ["system-ui", "sans"],
});

export const sfProText = localFont({
  src: [
    {
      path: "../../public/fonts/SF-Pro/Text/sf-pro-text-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/SF-Pro/Text/sf-pro-text-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sfpro-text",
  display: "swap",
  fallback: ["system-ui", "sans"],
});
