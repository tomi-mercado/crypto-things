"use client";

import React from "react";
import { z } from "zod";
import { setCalculation } from "../actions/calculatorActions";
import Input from "./Input";
import SelectInput from "./SelectInput";

interface CalculatorProps {
  defaultValues?: {
    amount: number;
    from: string;
    to: string;
    periodicity: string;
  };
}

const calculationSchema = z.object({
  from: z.coerce
    .date({
      errorMap: () => {
        return {
          message: "From should be a valid date",
        };
      },
    })
    .min(new Date("2013-04-27"), "From can't be before 27-04-2013"),
  to: z.coerce
    .date({
      errorMap: () => {
        return {
          message: "To should be a valid date",
        };
      },
    })
    .max(new Date(), "To can't be in the future"),
  periodicity: z.union(
    [z.literal("daily"), z.literal("weekly"), z.literal("monthly")],
    {
      description: "Periodicity should be daily, weekly or monthly",
    }
  ),
  amount: z.coerce
    .number({
      description: "Amount should be a number",
    })
    .min(1, "Amount should be greater than 0"),
});

const initialErrors = {
  amount: "",
  from: "",
  to: "",
  periodicity: "",
};

const Calculator: React.FC<CalculatorProps> = ({ defaultValues }) => {
  const [errors, setErrors] = React.useState(initialErrors);

  const handleSubmit = async (formData: FormData) => {
    try {
      const data = {
        amount: formData.get("amount"),
        from: formData.get("from"),
        to: formData.get("to"),
        periodicity: formData.get("periodicity"),
      };

      calculationSchema.parse(data);
      setErrors(initialErrors);
      await setCalculation(formData);
    } catch (e) {
      const error = e as z.ZodError;

      const errors = error.errors.reduce((acc, error) => {
        return {
          ...acc,
          [error.path[0]]: error.message,
        };
      }, initialErrors);

      setErrors(errors);
    }
  };

  return (
    <form action={handleSubmit} className="flex flex-col gap-4">
      <Input
        name="amount"
        type="number"
        defaultValue={defaultValues?.amount}
        error={errors.amount}
        label="Amount"
      />

      <Input
        name="from"
        type="date"
        defaultValue={defaultValues?.from}
        error={errors.from}
        label="From"
      />

      <Input
        name="to"
        type="date"
        defaultValue={defaultValues?.to}
        error={errors.to}
        label="To"
      />

      <SelectInput
        name="periodicity"
        defaultValue={defaultValues?.periodicity}
        options={[
          {
            label: "Daily",
            value: "daily",
          },
          {
            label: "Weekly",
            value: "weekly",
          },
          {
            label: "Monthly",
            value: "monthly",
          },
        ]}
        error={errors.periodicity}
        label="Periodicity"
      />

      <button
        className="bg-yellow-100 w-full rounded-md text-gray-800 font-semibold p-2 hover:bg-yellow-200 active:bg-yellow-300"
        type="submit"
      >
        Calculate
      </button>
    </form>
  );
};

export default Calculator;
