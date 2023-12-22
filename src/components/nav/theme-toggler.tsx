import { useEffect, useState } from "react";
import _ from "lodash";
import { themeChange } from "theme-change";

function ThemeToggler() {
  const [activeTheme, setActiveTheme] = useState<string>();

  const toggleTheme = () => {
    if (activeTheme === "dark") {
      changeTheme("light");
      return;
    }
    changeTheme("dark");
  };

  const changeTheme = (str: string) => {
    localStorage.setItem("riffrant-theme", str);
    document.documentElement.setAttribute("data-theme", str);
    setActiveTheme(str);
  };

  useEffect(() => {
    const theme = localStorage.getItem("riffrant-theme");
    if (!theme) {
      changeTheme("dark");
      return;
    }
    changeTheme(theme);
  }, []);

  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <div className="form-control" data-choose-theme>
      <label className="flex items-center justify-between cursor-pointer gap-5">
        <span className="label-text">Dark Mode</span>
        <input
          type="checkbox"
          className="toggle"
          checked={activeTheme === "dark"}
          data-act-class="ACTIVECLASS"
          onChange={toggleTheme}
        />
      </label>
    </div>
  );
}

export default ThemeToggler;
