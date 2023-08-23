import api from "@/api";
import CoinItem from "@/components/CoinItem";
import Header from "@/components/Header";
import type { Metadata } from "next";
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
        <Header title="Crypto Things" />
        <div className="grid grid-cols-[1fr,3fr] gap-4 h-[calc(100vh-68px)] pr-4 pb-4 mt-4">
          <ul className="grid gap-4 overflow-scroll">
            {coins.map((coin) => (
              <Link key={coin.id} href={`${coin.id}`}>
                <CoinItem coin={coin} />
              </Link>
            ))}
          </ul>
          <div className="overflow-scroll">{children}</div>
        </div>
      </body>
    </html>
  );
}
