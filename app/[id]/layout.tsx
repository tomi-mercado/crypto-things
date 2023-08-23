import { getCalculation } from "@/actions/calculatorActions";
import api from "@/api";
import Calculator from "@/components/Calculator";
import CalculatorAndResultsWrapper from "@/components/CalculatorAndResultsWrapper";
import PriceChangePercentage from "@/components/PriceChangePercentage";
import RefreshButton from "@/components/RefreshButton";
import formatToCurrency from "@/utils/formatToCurrency";
import { formatDistance } from "date-fns";
import Image from "next/image";
import React from "react";

interface MainItemDataProps {
  children: React.ReactNode;
  title: string;
}

const MainItemData: React.FC<MainItemDataProps> = ({ children, title }) => {
  const className = "text-lg xl:text-2xl font-semibold";

  return (
    <div className="w-fit text-center">
      <p className="text-sm">{title}</p>
      {!React.isValidElement(children) ? (
        <p className={className}>{children}</p>
      ) : (
        React.cloneElement(children, {
          // @ts-expect-error
          className,
        })
      )}
    </div>
  );
};

export default async function ResultsLayout({
  children,
  params: { id },
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const coin = await api.coins.getById(id);
  const calculation = getCalculation();

  const periodicityText = {
    daily: "day",
    weekly: "week",
    monthly: "month",
  };

  return (
    <div className="flex flex-col gap-6 md:gap-10 p-6 rounded-md items-center relative">
      <div className="hidden fixed top-20 right-4 text-xs lg:flex gap-1">
        <RefreshButton />
        <p>
          Updated{" "}
          {formatDistance(new Date(coin.last_updated), new Date(), {
            addSuffix: true,
          })}
        </p>
      </div>
      <div className="flex flex-col gap-4 w-[60%]">
        <div className="w-full flex justify-center">
          <div className="grid grid-cols-[24px,1fr] items-center gap-2">
            <Image
              src={coin.image.small}
              alt={coin.name}
              width={24}
              height={24}
            />
            <h1 className="text-4xl font-bold">{coin.name}</h1>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 justify-items-center">
          <MainItemData title="Current Price">
            {formatToCurrency(coin.market_data.current_price.usd, "USD")}
          </MainItemData>

          <MainItemData title="24hs Change">
            <PriceChangePercentage
              priceChangePercentage={
                coin.market_data.price_change_percentage_24h
              }
            />
          </MainItemData>
        </div>

        <div className="hidden md:grid grid-cols-3 justify-items-center">
          <MainItemData title="All Time High">
            {formatToCurrency(coin.market_data.ath.usd, "USD")}
          </MainItemData>

          <MainItemData title="All Time Low">
            {formatToCurrency(coin.market_data.atl.usd, "USD")}
          </MainItemData>

          <MainItemData title="Market Cap">
            {formatToCurrency(coin.market_data.market_cap.usd, "USD", 0)}
          </MainItemData>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full">
        <p className="text-lg md:text-2xl font-semibold text-center">
          What would have happened if...? 🤔
        </p>

        {calculation && (
          <p className="text-center text-sm md:text-base">
            You had bought {calculation.amount} USD of {coin.name} from{" "}
            {calculation.from} to {calculation.to} every{" "}
            {periodicityText[calculation.periodicity]}.
          </p>
        )}

        <div className="block md:hidden">
          <CalculatorAndResultsWrapper defaultValues={calculation || undefined}>
            {children}
          </CalculatorAndResultsWrapper>
        </div>

        <div className="hidden md:grid grid-cols-[1fr,3fr] gap-4">
          <Calculator defaultValues={calculation || undefined} />
          {children}
        </div>
      </div>
    </div>
  );
}
