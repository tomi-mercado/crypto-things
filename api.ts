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
    getHistoricalById: (id: string, from: Date, to: Date) => {
      const fromUnix = Math.floor(from.getTime() / 1000);
      const toUnix = Math.floor(to.getTime() / 1000);

      return fetch(
        `${coinsApi}/coins/${id}/market_chart/range?vs_currency=usd&from=${fromUnix}&to=${toUnix}`,
        {
          next: {
            revalidate: 86400,
          },
        }
      ).then((res) => res.json() as Promise<Historical>);
    },
  },
};

export default api;
