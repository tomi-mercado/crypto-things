"use client";

import { useRouter } from "next/navigation";
import React from "react";
import RefreshIcon from "./icons/RefreshIcon";

const RefreshButton: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.refresh();
  };

  return (
    <button onClick={handleClick}>
      <RefreshIcon />
    </button>
  );
};

export default RefreshButton;
