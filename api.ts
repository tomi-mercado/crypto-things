import { Coin, CoinResume, Historical } from "./types/coins";
import { USDInARG } from "./types/usdInArg";

const usdInArsApi = "https://api.bluelytics.com.ar/v2/latest";
const coinsApi = "https://api.coingecko.com/api/v3";

const api = {
  usdInARG: {
    get: () =>
      fetch(usdInArsApi, {
        next: {
          revalidate: 3600,
        },
      }).then((res) => res.json() as Promise<USDInARG>),
  },
  coins: {
    getById: (id: string) =>
      fetch(`${coinsApi}/coins/${id}`, {
        next: {
          revalidate: 180,
        },
      }).then((res) => res.json() as Promise<Coin>),
    get: () =>
      fetch(`${coinsApi}/coins/markets?vs_currency=usd`, {
        next: {
          revalidate: 180,
        },
      }).then((res) => res.json() as Promise<CoinResume[]>),
    getHistoricalById: async (id: string, from: Date, to: Date) => {
      const fromUnix = Math.floor(from.getTime() / 1000);
      const toUnix = Math.floor(to.getTime() / 1000);

      const historical = await fetch(
        `${coinsApi}/coins/${id}/market_chart/range?vs_currency=usd&from=${fromUnix}&to=${toUnix}`,
        {
          next: {
            revalidate: 86400,
          },
        }
      ).then((res) => res.json() as Promise<Historical>);

      const map = new Map<string, number>();

      for (const [d, price] of historical.prices) {
        const date = new Date(d);
        const key = `${
          date.getMonth() + 1
        }-${date.getDate()}-${date.getFullYear()}`;

        if (!map.has(key)) {
          map.set(key, price);
        }
      }

      const filteredPrices = Array.from(map.entries()).map(([d, price]) => {
        return [new Date(d).getTime(), price];
      }) as [number, number][];

      historical.prices = filteredPrices;

      return historical;
    },
  },
};

export default api;
