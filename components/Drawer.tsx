import React from "react";

interface DrawerProps {
  drawerId: string;
  closeContent: React.ReactNode;
  openContent: React.ReactNode;
  closeButton?: boolean;
  isOpen?: boolean;
  onToggle?: () => void;
}

const Drawer: React.FC<DrawerProps> = ({
  closeContent,
  drawerId,
  openContent,
  closeButton = true,
  isOpen = false,
  onToggle,
}) => {
  return (
    <div className="drawer z-10">
      <input
        id={drawerId}
        type="checkbox"
        className="drawer-toggle"
        checked={isOpen}
        onChange={onToggle}
      />
      <div className="drawer-content">{closeContent}</div>
      <div className="drawer-side">
        <label htmlFor={drawerId} className="drawer-overlay"></label>
        {closeButton && isOpen && (
          <button
            className="text-primary-content absolute top-0 right-0 z-20 p-4"
            onClick={onToggle}
          >
            X
          </button>
        )}
        {openContent}
      </div>
    </div>
  );
};

export default Drawer;
