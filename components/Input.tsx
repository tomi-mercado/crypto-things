import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor="amount" className="text-sm pl-1">
          {label}
        </label>
      )}
      <input
        id={props.name}
        autoComplete="off"
        className="p-2 rounded-md"
        {...props}
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default Input;
