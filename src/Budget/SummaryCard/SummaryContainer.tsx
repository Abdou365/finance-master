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
    },
    {
      name: "decaissement",
      title: "Total de mes sortie",
      result: intelligentRound(account.sumExpense, "standard", 1, 2),
      image: "../assets/spend-your-money-alt.svg",
    },
    {
      name: "solde",
      title: "Solde des transactions",
      result: intelligentRound(account.balance, "standard", 1, 2),
      image: "../assets/rich.svg",
    },
  ];
  return (
    <div className=" grid grid-cols-3 gap-2">
      {result.map((r, key) => {
        return (
          <SummaryCard key={key} title={r.title} result={r.result.toString()} />
        );
      })}
    </div>
  );
};

export default SummaryContainer;
