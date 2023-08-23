import { CoinResume } from "@/types/coins";
import formatToCurrency from "@/utils/formatToCurrency";
import Image from "next/image";
import React from "react";
import PriceChangePercentage from "./PriceChangePercentage";

interface CoinItemProps {
  coin: CoinResume;
}

const CoinItem: React.FC<CoinItemProps> = ({ coin }) => {
  return (
    <li className="grid grid-cols-[36px,1fr,1fr,1fr] items-center gap-4 p-2 hover:bg-gray-700">
      <div className="justify-self-center">
        <Image src={coin.image} alt={coin.name} width={24} height={24} />
      </div>
      <div className="truncate">
        <div className="font-bold truncate">{coin.name}</div>
        <div>{coin.symbol.toUpperCase()}</div>
      </div>

      <div className="font-bold">
        {formatToCurrency(coin.current_price, "USD", 4)}
      </div>
      <PriceChangePercentage
        priceChangePercentage={coin.price_change_percentage_24h}
        className="justify-self-center"
      />
    </li>
  );
};

export default CoinItem;
