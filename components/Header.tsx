import React from "react";
interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="flex flex-col gap-1 p-4 h-[68px] bg-primary text-primary-content">
      <h1 className="text-3xl font-bold">{title}</h1>
    </header>
  );
};

export default Header;
