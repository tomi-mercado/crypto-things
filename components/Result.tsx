import api from "@/api";
import formatToCurrency from "@/utils/formatToCurrency";
import { differenceInDays } from "date-fns";
import React from "react";
import { getCalculation } from "../actions/calculatorActions";
import PriceChangePercentage from "./PriceChangePercentage";

interface MainItemDataProps {
  children: React.ReactNode;
  title: string;
  className?: string;
}

const MainItemData: React.FC<MainItemDataProps> = ({
  children,
  title,
  className,
}) => {
  const textClassName = "text-xl font-semibold";

  return (
    <div className={`w-fit text-center ${className || ""}`}>
      <p className="text-sm">{title}</p>
      {!React.isValidElement(children) ? (
        <p className={textClassName}>{children}</p>
      ) : (
        React.cloneElement(children, {
          // @ts-expect-error
          className,
        })
      )}
    </div>
  );
};

const divideDaysInto = {
  daily: 1,
  weekly: 7,
  monthly: 30,
};

const ResultInvestment = async ({ id }: { id: string }) => {
  const coinData = await api.coins.getById(id);

  const calculation = getCalculation();

  if (!calculation) {
    return null;
  }

  const { amount, from, to, periodicity } = calculation;

  const historicalData = await api.coins.getHistoricalById(
    id,
    new Date(from),
    new Date(to)
  );

  const firstDayInUnix = historicalData.prices[0][0];
  const diffDays = differenceInDays(new Date(to), new Date(firstDayInUnix));

  const totalInvested = amount * (diffDays / divideDaysInto[periodicity]);

  const totalCoinBought = historicalData.prices.reduce((acc, [_, dayPrice]) => {
    return acc + amount / dayPrice;
  }, 0);

  const coinPriceAverage = totalInvested / totalCoinBought;

  const priceIfSoldToday =
    totalCoinBought * coinData.market_data.current_price.usd;

  const profit = priceIfSoldToday - totalInvested;

  const profitPercentage = (profit / totalInvested) * 100;

  return (
    <div className="flex flex-col gap-4 self-center bg-gray-700 h-full justify-center rounded-xl">
      <MainItemData
        title="Total Coin Bought"
        className="w-full items-center flex flex-col"
      >
        {totalCoinBought} {coinData.name}
      </MainItemData>

      <div className="grid grid-cols-2 gap-4 place-items-center justify-items-center">
        <MainItemData title="Total Invested">
          {formatToCurrency(totalInvested, "USD")}
        </MainItemData>

        <MainItemData title="Coin Price Average">
          {formatToCurrency(coinPriceAverage, "USD")}
        </MainItemData>

        <MainItemData title="Price if Sold Today">
          {formatToCurrency(priceIfSoldToday, "USD")}
        </MainItemData>

        <MainItemData title="Profit">
          {formatToCurrency(profit, "USD")}{" "}
          <PriceChangePercentage
            priceChangePercentage={profitPercentage}
            className="text-sm"
            initDecorator="("
            endDecorator=")"
          />
        </MainItemData>
      </div>

      {/* <div>
        <p>Profit Percentage</p>
        <PriceChangePercentage priceChangePercentage={profitPercentage} />
      </div> */}
    </div>
  );
};

export default ResultInvestment;
