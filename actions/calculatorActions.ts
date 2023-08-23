"use server";

import { cookies } from "next/headers";

type Periodicity = "daily" | "weekly" | "monthly";

export async function setCalculation(formData: FormData) {
  const data = {
    from: formData.get("from"),
    to: formData.get("to"),
    periodicity: formData.get("periodicity"),
    amount: formData.get("amount"),
  };

  cookies().set("calculation", JSON.stringify(data));
}

export const getCalculation = () => {
  const calculationSaved = cookies().get("calculation")?.value;
  if (!calculationSaved) {
    return null;
  }

  const calculation = JSON.parse(calculationSaved) as {
    from: string;
    to: string;
    periodicity: Periodicity;
    amount: string;
  };

  return {
    ...calculation,
    amount: parseFloat(calculation.amount),
  };
};
