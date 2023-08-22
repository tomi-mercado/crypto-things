import formatToCurrency from "@/utils/formatToCurrency";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Crypto Things",
  description: "Things about crypto",
};

interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number | null;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number | null;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: Date;
  atl: number;
  atl_change_percentage: number;
  atl_date: Date;
  roi: Roi | null;
  last_updated: Date;
}

interface Roi {
  times: number;
  currency: string;
  percentage: number;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const coins = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd",
    {
      next: {
        revalidate: 180,
      },
    }
  ).then((res) => res.json() as Promise<Coin[]>);

  return (
    <html lang="en">
      <body className="h-screen">
        <header className="flex flex-col gap-1 p-4 bg-yellow-100 text-black h-[68px]">
          <h1 className="text-3xl font-bold">{metadata.title as string}</h1>
        </header>
        <div className="grid grid-cols-[1fr,3fr] gap-4 h-[calc(100vh-68px)] mt-4">
          <ul className="grid gap-4 overflow-scroll">
            {coins.map((coin) => (
              <Link key={coin.id} href={`${coin.id}`}>
                <li className="grid grid-cols-[36px,1fr,1fr,1fr] items-center gap-4 p-2 hover:bg-yellow-100 hover:text-black">
                  <div className="justify-self-center">
                    <Image
                      src={coin.image}
                      alt={coin.name}
                      width={24}
                      height={24}
                    />
                  </div>
                  <div className="truncate">
                    <div className="font-bold truncate">{coin.name}</div>
                    <div>{coin.symbol.toUpperCase()}</div>
                  </div>

                  <div className="font-bold">
                    {formatToCurrency(coin.current_price, "USD")}
                  </div>
                  <div
                    className={`${
                      coin.price_change_percentage_24h >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    } justify-self-center`}
                  >
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </div>
                </li>
              </Link>
            ))}
          </ul>
          <div className="overflow-scroll">{children}</div>
        </div>
      </body>
    </html>
  );
}
