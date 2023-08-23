const formatToCurrency = (
  value: number,
  currency: string,
  maximumFractionDigits = 2
) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits,
  }).format(value);
};

export default formatToCurrency;
