import { useParams } from "react-router-dom";
import { useGetItems } from "../../store.tsx/useItems";
import ComparisonChart from "../Charts/ComparisonChart";
import RepartitionChart from "../Charts/RepartitionChart";
import SummaryContainer from "../SummaryCard/SummaryContainer";
import { useAccountDashboard } from "../../store.tsx/useAccount";
import Wait from "../../components/Wait/Wait";

const DashBoard = () => {
  const { accountId } = useParams();
  const { data } = useGetItems(accountId);
  const account = useAccountDashboard(accountId);

  if (!data) {
    return <Wait />;
  }

  return (
    <div
      style={{ height: "calc(100vh - 3rem)" }}
      className=" bg-gray-50 flex flex-col align-middle flex-1 justify-center place-items-center p-3 gap-2"
    >
      <div className=" container flex flex-col gap-2">
        <SummaryContainer account={account?.summarize} />
      </div>
      <div className=" container flex flex-1 overflow-hidden gap-4">
        <div className=" flex-col gap-2 flex overflow-hidden flex-1">
          <ComparisonChart items={data} />
        </div>
        <div className="w-[300px]">
          <RepartitionChart data={account?.expenseRepartition} />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
