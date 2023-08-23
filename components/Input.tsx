"use client";

import React from "react";
import { tv } from "tailwind-variants";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftDecorator?: React.ReactNode;
  rightDecorator?: React.ReactNode;
}

const input = tv({
  base: "input input-bordered input-primary w-full",
  variants: {
    color: {
      error: "input input-error",
    },
    behaviour: {
      joined: "join-item border-l-0 focus:border-l-0 focus:outline-none",
    },
  },
});

const wrapper = tv({
  base: "w-full",
  variants: {
    outline: {
      focused: "outline outline-2 outline-offset-2 outline-primary",
    },
    behaviour: {
      joined: "join",
    },
  },
});

const decorator = tv({
  base: "join-item badge-primary flex justify-center items-center min-w-[36px] max-w-[48px] border border-primary",
});

const Input: React.FC<InputProps> = ({
  label,
  error,
  leftDecorator,
  rightDecorator,
  ...props
}) => {
  const isJoined = leftDecorator || rightDecorator;

  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <div className="form-control w-full">
      {label && (
        <label className="label" htmlFor={props.name}>
          <span className="label-text">{label}</span>
        </label>
      )}
      <div
        className={wrapper({
          behaviour: isJoined ? "joined" : undefined,
          outline: isFocused && isJoined ? "focused" : undefined,
        })}
      >
        {leftDecorator && <div className={decorator()}>{leftDecorator}</div>}
        <input
          id={props.name}
          className={input({
            color: error ? "error" : undefined,
            className: props.className,
            behaviour: isJoined ? "joined" : undefined,
          })}
          autoComplete="off"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {rightDecorator && <div className={decorator()}>{rightDecorator}</div>}
      </div>
      {error && (
        <label className="label">
          <span className="label-text-alt text-red-500">{error}</span>
        </label>
      )}
    </div>
  );
};

export default Input;
