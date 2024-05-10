import { AccountSummarize } from "../../types/account.type";
import SummaryCard from "./SummaryCard";

const SummaryContainer = ({ account }: { account?: AccountSummarize }) => {
  if (!account) {
    return <div>...chargement</div>;
  }
  const result = [
    {
      name: "encaissement",
      title: "Total de mes entrée",
      result: account.sumPayment,
      image: "../assets/getting-paid.svg",
    },
    {
      name: "decaissement",
      title: "Total de mes sortie",
      result: account.sumExpense,
      image: "../assets/spend-your-money-alt.svg",
    },
    {
      name: "solde",
      title: "Solde des transactions",
      result: account.balance,
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
