import React, { createContext, useState } from "react";

export const ThemeContext = createContext<{
  theme: string;
  changeTheme: (str: "light" | "dark") => void;
}>({
  theme: "",
  changeTheme: () => {},
});
