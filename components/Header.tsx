import React from "react";
import ToggleThemeButton from "./ToggleThemeButton";
interface HeaderProps {
  title: string;
  theme: string;
  themes: string[];
}

const Header: React.FC<HeaderProps> = ({ title, theme, themes }) => {
  return (
    <header className="flex justify-between p-4 h-[68px] bg-primary text-primary-content">
      <h1 className="text-3xl font-bold">{title}</h1>

      <ToggleThemeButton theme={theme} list={themes} />
    </header>
  );
};

export default Header;
