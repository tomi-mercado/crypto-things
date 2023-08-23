import React from "react";
import { tv } from "tailwind-variants";

interface PriceChangePercentageProps {
  priceChangePercentage: number;
  initDecorator?: string;
  endDecorator?: string;
  className?: string;
}

const p = tv({
  variants: {
    color: {
      positive: "text-green-500",
      negative: "text-red-500",
    },
  },
});

const PriceChangePercentage: React.FC<PriceChangePercentageProps> = ({
  priceChangePercentage,
  endDecorator,
  initDecorator,
  className,
}) => {
  return (
    <span
      className={p({
        color: priceChangePercentage >= 0 ? "positive" : "negative",
        class: className,
      })}
    >
      {initDecorator}
      {priceChangePercentage.toFixed(2)}%{endDecorator}
    </span>
  );
};

export default PriceChangePercentage;
