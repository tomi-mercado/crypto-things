import api from "@/api";
import CoinItem from "@/components/CoinItem";
import Header from "@/components/Header";
import tailwindConfig from "@/tailwind.config";
import type { Metadata } from "next";
import { cookies } from "next/headers";
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

  const themeCookie = cookies().get("theme");
  const currentTheme = themeCookie ? themeCookie.value : "business";

  return (
    <html lang="en" data-theme={currentTheme}>
      <body className="h-screen">
        <Header
          title="Crypto Things"
          theme={currentTheme}
          themes={tailwindConfig.daisyui.themes}
        />
        <div className="grid grid-cols-[1fr,3fr] gap-4 h-[calc(100vh-68px)]">
          <ul className="grid gap-4 overflow-scroll no-scrollbar bg-base-300">
            {coins.map((coin) => (
              <Link key={coin.id} href={`${coin.id}`}>
                <CoinItem coin={coin} />
              </Link>
            ))}
          </ul>
          <div className="overflow-scroll no-scrollbar">{children}</div>
        </div>
      </body>
    </html>
  );
}
