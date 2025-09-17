import cookieHandler from "@global/cookie/handler/Handler";

type Props = {};

export default function useTheme({}: Props) {
  const cookie = new cookieHandler();

  const toggleTheme = () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    const dark = document.documentElement.classList.contains("dark-theme");
    if (dark) {
      document.documentElement.classList.remove("dark-theme");
      cookie.setCookie("theme", "light", date);
    } else {
      document.documentElement.classList.add("dark-theme");
      cookie.setCookie("theme", "dark", date);
    }
  };

  return {
    toggleTheme,
  };
}
