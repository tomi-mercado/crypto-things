"use client";

import React from "react";
import Calculator from "./Calculator";

interface CalculatorAndResultsWrapperProps {
  defaultValues?: {
    amount: number;
    from: string;
    to: string;
    periodicity: string;
  };
  children: React.ReactNode;
}

const CalculatorAndResultsWrapper: React.FC<
  CalculatorAndResultsWrapperProps
> = ({ defaultValues, children }) => {
  const [showing, setShowing] = React.useState<"calculator" | "results">(
    "calculator"
  );

  const handleSubmit = () => {
    setShowing("results");
  };

  if (showing === "calculator") {
    return <Calculator onSubmit={handleSubmit} defaultValues={defaultValues} />;
  }

  return (
    <div className="flex flex-col gap-2">
      {children}
      <button
        className="btn btn-secondary"
        onClick={() => setShowing("calculator")}
      >
        Calculate again
      </button>
    </div>
  );
};

export default CalculatorAndResultsWrapper;
