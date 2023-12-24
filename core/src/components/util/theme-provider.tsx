"use client"
import { ThemeContext } from "@/context/theme-context";
import { useCallback, useEffect, useState } from "react";
import { themeChange } from "theme-change";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const changeTheme = useCallback((str: "light" | "dark") => {
    localStorage.setItem("riffrant-theme", str);
    document.documentElement.setAttribute("data-theme", str);
    setTheme(str);
  }, []);

  useEffect(() => {
    themeChange(false);
  }, []);

  useEffect(() => {
    const theme: any = localStorage.getItem("riffrant-theme");
    if (!theme) {
      changeTheme("dark");
      return;
    }
    changeTheme(theme);
  }, [changeTheme]);

  return (
    <ThemeContext.Provider value={{ theme: theme, changeTheme: changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
