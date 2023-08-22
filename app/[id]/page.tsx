import api from "@/api";
import formatToCurrency from "@/utils/formatToCurrency";
import Image from "next/image";

export default async function CoinPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const coin = await api.coins.getById(id);
  const usdInARG = await api.usdInARG.get();

  return (
    <div>
      <div className="grid grid-cols-[24px,1fr] items-center gap-2">
        <Image src={coin.image.small} alt={coin.name} width={24} height={24} />
        <h1 className="text-3xl font-bold">{coin.name}</h1>
      </div>

      <h2 className="text-2xl font-bold">Market Data</h2>
      <h3>Current price</h3>
      <ul>
        <li>
          <span className="font-bold">USD</span>:{" "}
          {formatToCurrency(coin.market_data.current_price.usd, "USD")}
        </li>
        <li>
          <span className="font-bold">ARS</span>:{" "}
          {formatToCurrency(
            coin.market_data.current_price.usd * usdInARG.blue.value_sell,
            "ARS"
          )}
        </li>
      </ul>

      <h2 className="text-2xl font-bold">Sentiment</h2>
      <ul>
        <li>
          <span className="font-bold">Upvotes</span>:{" "}
          {coin.sentiment_votes_up_percentage}
        </li>
        <li>
          <span className="font-bold">Downvotes</span>:{" "}
          {coin.sentiment_votes_down_percentage}
        </li>
      </ul>
    </div>
  );
}
