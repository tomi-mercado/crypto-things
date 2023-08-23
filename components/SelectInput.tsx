import React from "react";
import { tv } from "tailwind-variants";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: {
    label: string;
    value: string;
  }[];
}

const select = tv({
  base: "select select-bordered select-primary w-full",
  variants: {
    color: {
      error: "select select-error",
    },
  },
});

const SelectInput: React.FC<SelectProps> = ({ label, error, ...props }) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="label" htmlFor={props.name}>
          <span className="label-text">{label}</span>
        </label>
      )}
      <select
        id={props.name}
        className={select({
          color: error ? "error" : undefined,
          className: props.className,
        })}
        {...props}
      >
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <label className="label">
          <span className="label-text-alt text-red-500">{error}</span>
        </label>
      )}
    </div>
  );
};

export default SelectInput;
