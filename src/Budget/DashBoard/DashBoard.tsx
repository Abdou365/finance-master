import { useParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import AnimatedNumber from "../../components/AnimatedNumber";
import Badge from "../../components/Badge/Badge";
import ListComponent from "../../components/List/ListComponent";
import ListItemComponent from "../../components/List/ListItemComponent";
import Wait from "../../components/Wait/Wait";
import { useAccountDashboard } from "../../store.tsx/useAccount";
import ComparisonChart from "../Charts/ComparisonChart";
import RepartitionChart from "../Charts/RepartitionChart";
import { ObjectifInfo } from "../Objectif/ObjectifInfo";
import SummaryContainer from "../SummaryCard/SummaryContainer";
import BoxComponent from "../../components/Box/BoxComponent";

const DashBoard = () => {
  const { accountId } = useParams();
  const account = useAccountDashboard(accountId);

  if (!account) {
    return <Wait />;
  }

  return (
    <div className="lk-scroll" style={{ overflow: "auto" }}>
      <div className="flex flex-col align-middle flex-1 lg:p-10 sm:p-3 justify-center place-items-center gap-2">
        <SummaryContainer account={account?.summarize} />
        <div className=" container flex flex-1 gap-2 flex-wrap">
          <div className=" flex-col gap-2 flex  flex-1">
            <ComparisonChart chartData={account.comparison} />
            <BoxComponent>
              <ListComponent title="Les derniers mouvements">
                {account?.Item.map((item) => {
                  return (
                    <ListItemComponent>
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
                    </ListItemComponent>
                  );
                })}
              </ListComponent>
            </BoxComponent>
          </div>
          <div className=" h-fit space-y-2 md:w-fit w-full">
            <RepartitionChart data={account?.expenseRepartition} />
            <ObjectifInfo
              completed={account?.Objectif.completed}
              length={account?.Objectif.total}
              progress={account?.Objectif.progress}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
