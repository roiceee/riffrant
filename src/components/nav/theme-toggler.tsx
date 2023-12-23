import { useContext, useEffect, useState } from "react";
import _ from "lodash";
import { themeChange } from "theme-change";
import { ThemeContext } from "@/context/theme-context";

function ThemeToggler() {
  
  const { theme, changeTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    if (theme === "dark") {
      changeTheme("light");
      return;
    }
    changeTheme("dark");
  };

  console.log(theme);

  return (
    <div className="form-control" data-choose-theme>
      <label className="flex items-center justify-between cursor-pointer gap-5">
        <span className="label-text">Dark Mode</span>
        <input
          type="checkbox"
          className="toggle"
          checked={theme === "dark"}
          data-act-class="ACTIVECLASS"
          onChange={toggleTheme}
        />
      </label>
    </div>
  );
}

export default ThemeToggler;
