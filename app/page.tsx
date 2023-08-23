import api from "@/api";
import Image from "next/image";
import Link from "next/link";

export default async function NotSelectedPage() {
  const coins = await api.coins.get();
  const coinsToOmit = ["usd-coin", "tether"];
  const coinsToDisplay = coins
    .filter((coin) => !coinsToOmit.includes(coin.id))
    .slice(0, 6);

  return (
    <div className="flex flex-col gap-6 text-center justify-center h-full">
      <h2 className="text-4xl">
        Welcome to{" "}
        <span className="underline -underline-offset-1 decoration-4 decoration-primary">
          Crypto Things
        </span>{" "}
        👋🏻 💸
      </h2>

      <p>
        This is the place to get sad that you {`didn't`} make that crypto
        investment you believed in so much 😪, or relieved that you {`didn't`}{" "}
        😅
      </p>

      <p>
        Click on any of the cryptocurrencies on the left to start your
        calculations 🧮
      </p>

      <p>Or click on one of these to get started:</p>

      <div className="grid grid-cols-6 place-items-center">
        {coinsToDisplay.map((coin) => (
          <div
            className="tooltip tooltip-bottom tooltip-primary"
            data-tip={coin.name}
            key={coin.id}
          >
            <Link href={`${coin.id}`}>
              <Image
                src={coin.image}
                alt={coin.name}
                width={48}
                height={48}
                className="rounded-full"
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
