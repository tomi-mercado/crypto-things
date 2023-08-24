"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import Drawer from "./Drawer";
import ToggleThemeButton from "./ToggleThemeButton";
import MenuIcon from "./icons/MenuIcon";
interface HeaderProps {
  title: string;
  theme: string;
  themes: string[];
  drawerContent?: React.ReactNode;
}

const drawerId = "coinsDrawer";

const DrawerButton = () => (
  <label htmlFor={drawerId} className="btn btn-square btn-ghost">
    <MenuIcon />
  </label>
);

const Header: React.FC<HeaderProps> = ({
  title,
  theme,
  themes,
  drawerContent,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  // Close drawer when navigating to a new page
  const params = useParams();
  const currentIdParam = params?.id;
  const currentId = React.useRef(currentIdParam);
  useEffect(() => {
    if (currentId.current !== currentIdParam && isDrawerOpen) {
      setIsDrawerOpen(false);
      currentId.current = currentIdParam;
    }
  }, [currentIdParam, isDrawerOpen]);

  return (
    <header className="flex justify-between p-4 h-[68px] bg-primary text-primary-content">
      <div className="flex gap-2 items-center">
        {drawerContent && (
          <div className="xl:hidden">
            <Drawer
              drawerId={drawerId}
              closeContent={<DrawerButton />}
              openContent={drawerContent}
              isOpen={isDrawerOpen}
              onToggle={toggleDrawer}
            />
          </div>
        )}
        <Link href="/">
          <h1 className="text-xl xl:text-3xl font-bold">💸🕯️{title}</h1>
        </Link>
      </div>

      <ToggleThemeButton theme={theme} list={themes} />
    </header>
  );
};

export default Header;
