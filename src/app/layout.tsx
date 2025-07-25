import SplashScreen from "@/component/splashScreen/SplashScreen";
import "@/app/globals.css";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { comfortaa, inter, sfProDisplay, sfProText } from "./fonts";
import AppHeightWrapper from "@global/provider/AppHeightWrapper";

export const metadata: Metadata = {
  title: "MedRQE",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const splashShown = cookieStore.get("splash_shown")?.value;
  const theme = cookieStore.get("theme")?.value || "light";

  return (
    <html
      lang="pt-BR"
      className={`${comfortaa.variable} ${sfProDisplay.variable} ${sfProText.variable} ${inter.variable} ${theme === "dark" ? "dark-theme" : ""}`}
    >
      <body className="screen">
        <AppHeightWrapper />
        {!splashShown ? <SplashScreen /> : children}
        <div id="drawer-root"></div>
        <div id="dialog-root"></div>
      </body>
    </html>
  );
}
