import { getCalculation } from "@/actions/calculator";
import api from "@/api";
import PriceChangePercentage from "@/components/PriceChangePercentage";
import formatToCurrency from "@/utils/formatToCurrency";
import React from "react";

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
  const textClassName = "text-lg md:text-xl font-semibold";

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

const ResultsPage = async ({ params: { id } }: { params: { id: string } }) => {
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

  const totalInvested = historicalData.prices.length * amount;

  const totalCoinBought = {
    daily: historicalData.prices.reduce((acc, [_, dayPrice]) => {
      return acc + amount / dayPrice;
    }, 0),
    weekly: historicalData.prices.reduce((acc, [_, dayPrice], index) => {
      if (index % divideDaysInto[periodicity] === 0) {
        return acc + amount / dayPrice;
      }

      return acc;
    }, 0),
    monthly: historicalData.prices.reduce((acc, [_, dayPrice], index) => {
      if (index % divideDaysInto[periodicity] === 0) {
        return acc + amount / dayPrice;
      }

      return acc;
    }, 0),
  }[periodicity];

  const coinPriceAverage = totalInvested / totalCoinBought;

  const priceIfSoldToday =
    totalCoinBought * coinData.market_data.current_price.usd;
  const profit = priceIfSoldToday - totalInvested;
  const profitPercentage = (profit / totalInvested) * 100;

  const priceIfSoldATH = totalCoinBought * coinData.market_data.ath.usd;
  const profitATH = priceIfSoldATH - totalInvested;
  const profitPercentageATH = (profitATH / totalInvested) * 100;

  const investment = {
    id,
    calculation,
    coinPriceAverage,
    priceIfSoldATH,
    priceIfSoldToday,
    profit,
    profitATH,
    profitPercentage,
    profitPercentageATH,
    totalCoinBought,
    totalInvested,
  };

  return (
    <div className="flex flex-col gap-4 self-center h-full justify-center rounded-xl">
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

        <MainItemData title="Price if Sold ATH">
          {formatToCurrency(priceIfSoldATH, "USD")}
        </MainItemData>

        <MainItemData title="Profit ATH">
          {formatToCurrency(profitATH, "USD")}{" "}
          <PriceChangePercentage
            priceChangePercentage={profitPercentageATH}
            className="text-sm"
            initDecorator="("
            endDecorator=")"
          />
        </MainItemData>
      </div>
    </div>
  );
};

export default ResultsPage;
