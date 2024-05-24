import { FaAngleDoubleDown, FaAngleDoubleUp } from "react-icons/fa";
import { AccountSummarize } from "../../types/account.type";
import { intelligentRound } from "../../utils/rounding";
import SummaryCard from "./SummaryCard";

const SummaryContainer = ({ account }: { account?: AccountSummarize }) => {
  if (!account) {
    return <div>...chargement</div>;
  }
  const result = [
    {
      name: "encaissement",
      title: "Total de mes entrée",
      result: intelligentRound(account.sumPayment, "standard", 1, 2),
      image: "../assets/getting-paid.svg",
      icon: FaAngleDoubleUp,
      variant: "positive",
    },
    {
      name: "decaissement",
      title: "Total de mes sortie",
      result: intelligentRound(account.sumExpense, "standard", 1, 2),
      image: "../assets/spend-your-money-alt.svg",
      icon: FaAngleDoubleDown,
      variant: "negative",
    },
    {
      name: "solde",
      title: "Solde des transactions",
      result: intelligentRound(account.balance, "standard", 1, 2),
      image: "../assets/rich.svg",
    },
  ];
  return (
    <div className=" flex justify-around gap-2 bg-white rounded border items-center">
      {result.map((r, key) => {
        return (
          <>
            <SummaryCard
              index={key}
              key={key}
              title={r.title}
              result={r.result}
              icon={r.icon}
              variant={r.variant}
            />
            {key === 0 ? (
              <span className="text-xl font-bold">-</span>
            ) : (
              key === 1 && <span className="text-xl font-bold">=</span>
            )}
          </>
        );
      })}
    </div>
  );
};

export default SummaryContainer;
