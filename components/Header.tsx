import React from "react";
interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="flex flex-col gap-1 p-4 bg-yellow-100 text-black h-[68px]">
      <h1 className="text-3xl font-bold">{title}</h1>
    </header>
  );
};

export default Header;
