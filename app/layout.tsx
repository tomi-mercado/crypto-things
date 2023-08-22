import api from "@/api";
import formatToCurrency from "@/utils/formatToCurrency";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Crypto Things",
  description: "Things about crypto",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const coins = await api.coins.get();

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
