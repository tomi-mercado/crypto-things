"use client";

import { useEffect, useState } from "react";
import MoonIcon from "./icons/MoonIcon";
import SunIcon from "./icons/SunIcon";

export default function ToggleThemeButton({
  theme,
  list,
}: {
  theme: string;
  list: string[];
}) {
  const [currentTheme, setTheme] = useState(theme);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // Set the cookie "theme" with an expiry date of 400 days (Maximum expiry date for Chromium browsers).
    document.cookie =
      `theme=${currentTheme};expires=` +
      new Date(new Date().getTime() + 400 * 24 * 60 * 60 * 1000).toUTCString();
    // Set the data-theme attribute for <html>
    document.documentElement.setAttribute("data-theme", currentTheme);
    setLoading(false);
  }, [currentTheme]);

  function toggleTheme() {
    setLoading(true);

    const currentIndex = list.indexOf(currentTheme);
    const isLastTheme = currentIndex === list.length - 1;

    if (currentIndex >= 0 && currentIndex < list.length && !isLastTheme) {
      setTheme(list[currentIndex + 1]);
      return;
    }

    setTheme(list[0]);
  }

  return (
    <label className="swap swap-rotate">
      <input type="checkbox" onChange={toggleTheme} />
      <MoonIcon className="swap-on" />
      <SunIcon className="swap-off" />
    </label>
  );
}
