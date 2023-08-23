import React from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: {
    label: string;
    value: string;
  }[];
}

const SelectInput: React.FC<SelectProps> = ({ label, error, ...props }) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor="amount" className="text-sm pl-1">
          {label}
        </label>
      )}
      <select
        id={props.name}
        autoComplete="off"
        className="p-2 rounded-md"
        {...props}
      >
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default SelectInput;
