import { useParams } from "react-router-dom";
import { useGetItems } from "../../store.tsx/useItems";
import ComparisonChart from "../Charts/ComparisonChart";
import RepartitionChart from "../Charts/RepartitionChart";
import SummaryContainer from "../SummaryCard/SummaryContainer";
import { useAccountDashboard } from "../../store.tsx/useAccount";
import Wait from "../../components/Wait/Wait";
import { ObjectifInfo } from "../Objectif/ObjectifInfo";
import List from "../../components/List/List";
import ListItem from "../../components/List/ListItem";
import Badge from "../../components/Badge/Badge";
import { twMerge } from "tailwind-merge";
import AnimatedNumber from "../../components/AnimatedNumber";

const DashBoard = () => {
  const { accountId } = useParams();
  const account = useAccountDashboard(accountId);

  if (!account) {
    return <Wait />;
  }
  console.log(account?.Item);

  return (
    <div
      style={{ height: "calc(100vh - 3rem)" }}
      className=" flex flex-col align-middle flex-1 justify-center place-items-center p-3 gap-2"
    >
      <SummaryContainer account={account?.summarize} />
      <div className=" container flex flex-1 overflow-hidden gap-2">
        <div className=" flex-col gap-2 flex overflow-hidden flex-1">
          <ComparisonChart chartData={account.comparison} />
          <div className="bg-white dark:bg-primary-900 rounded border dark:border-primary-600">
            <List title="Les derniers mouvements">
              {account?.Item.map((item) => {
                return (
                  <ListItem>
                    <Badge type="primary">{item.category}</Badge>
                    <p className="text-sm">{item.title}</p>
                    <AnimatedNumber
                      className={twMerge(
                        "ml-auto text-sm font-semibold",
                        item.isExpense ? "text-red-500" : "text-green-500"
                      )}
                      value={item.value}
                      duration={500}
                      withSign
                    />
                  </ListItem>
                );
              })}
            </List>
          </div>
        </div>
        <div className="w-[300px] space-y-2">
          <RepartitionChart data={account?.expenseRepartition} />
          <ObjectifInfo
            completed={account?.Objectif.completed}
            length={account?.Objectif.total}
            progress={account?.Objectif.progress}
          />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
