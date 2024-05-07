import partition from "lodash/partition";
import sumBy from "lodash/sumBy";
import { useItems } from "../../store.tsx/store.ctx";
import SummaryCard from "./SummaryCard";

const SummaryContainer = () => {
  const { items } = useItems();
  const [decaiss, encaiss] = partition(items, (e) => e.isExpense);
  const sommeEncaiss = sumBy(encaiss, "value");
  const sommeDecaiss = sumBy(decaiss, "value");
  const result = [
    {
      name: "encaissement",
      title: "Total de mes entrée",
      result: sommeEncaiss,
      image: "../assets/getting-paid.svg",
    },
    {
      name: "decaissement",
      title: "Total de mes sortie",
      result: sommeDecaiss,
      image: "../assets/spend-your-money-alt.svg",
    },
    {
      name: "solde",
      title: "Solde des transactions",
      result: sommeEncaiss - sommeDecaiss,
      image: "../assets/rich.svg",
    },
  ];
  return (
    <div className=" grid grid-cols-3 gap-2">
      {result.map((r) => {
        return <SummaryCard title={r.title} result={r.result.toString()} />;
      })}
    </div>
  );
};

export default SummaryContainer;
