import { Coin, CoinResume } from "./types/coins";
import { USDInARG } from "./types/usdInArg";

const api = {
  usdInARG: {
    get: () =>
      fetch("https://api.bluelytics.com.ar/v2/latest", {
        next: {
          revalidate: 3600,
        },
      }).then((res) => res.json() as Promise<USDInARG>),
  },
  coins: {
    getById: (id: string) =>
      fetch(`https://api.coingecko.com/api/v3/coins/${id}`, {
        next: {
          revalidate: 180,
        },
      }).then((res) => res.json() as Promise<Coin>),
    get: () =>
      fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd", {
        next: {
          revalidate: 180,
        },
      }).then((res) => res.json() as Promise<CoinResume[]>),
  },
};

export default api;
