import ComparisonChart from "../Charts/ComparisonChart";
import RepartitionChart from "../Charts/RepartitionChart";
import SummaryContainer from "../SummaryCard/SummaryContainer";

const DashBoard = () => {
  return (
    <div
      style={{ height: "calc(100vh - 3rem)" }}
      className=" flex flex-col align-middle flex-1 justify-center place-items-center p-3 gap-2"
    >
      <div className=" container flex flex-col gap-2">
        <SummaryContainer />
      </div>
      <div className=" container flex flex-1 overflow-hidden gap-4">
        <div className=" flex-col gap-2 flex overflow-hidden flex-1">
          <ComparisonChart />
        </div>
        <div className="w-[300px]">
          <RepartitionChart />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
