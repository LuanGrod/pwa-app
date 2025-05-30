import localFont from "next/font/local";

export const inter = localFont({
  src: [
    {
      path: "../../public/project/fonts/Inter/Inter_18pt-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/project/fonts/Inter/Inter_18pt-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-input",
  display: "swap",
  fallback: ["system-ui", "sans"],
});

export const comfortaa = localFont({
  src: [
    {
      path: "../../public/project/fonts/Comfortaa/Comfortaa-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/project/fonts/Comfortaa/Comfortaa-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-rounded",
  display: "swap",
  fallback: ["ui-monospace", "monospace"],
});

export const sfProDisplay = localFont({
  src: [
    {
      path: "../../public/project/fonts/SF-Pro/Display/sf-pro-display-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/project/fonts/SF-Pro/Display/sf-pro-display-semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/project/fonts/SF-Pro/Display/sf-pro-display-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-title",
  display: "swap",
  fallback: ["system-ui", "sans"],
});

export const sfProText = localFont({
  src: [
    {
      path: "../../public/project/fonts/SF-Pro/Text/sf-pro-text-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/project/fonts/SF-Pro/Text/sf-pro-text-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-text",
  display: "swap",
  fallback: ["system-ui", "sans"],
});
