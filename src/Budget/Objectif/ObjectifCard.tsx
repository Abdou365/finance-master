import { format } from "date-fns";
import { FaEllipsisV, FaMoneyBillWave, FaPiggyBank } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import Badge from "../../components/Badge/Badge";
import Button from "../../components/Button/Button";
import Tooltip from "../../components/Tooltip/Tooltip";
import { ObjectifType } from "../../types/objectif.type";
import "./ObjectifCard.scss";

const ObjectifDate: React.FC<{ objectif: ObjectifType }> = ({ objectif }) => {
  console.log(objectif);

  if (objectif.isRecurrent) {
    return (
      <>
        Recurrent : {objectif.recurrenceInterval} {objectif.recurrence}
      </>
    );
  }
  return (
    <>
      {objectif.from && format(objectif.from, "dd MMM yy")} -{" "}
      {objectif.to && format(objectif.to, "dd MMM yy")}
    </>
  );
};

export const ObjectifCard: React.FC<{
  objectif: ObjectifType;
  onSelect: (objectif: ObjectifType) => void;
  onEdit: (objectif: ObjectifType) => void;
  onDelete: (objectif: ObjectifType) => void;
}> = ({ objectif, onSelect, onEdit, onDelete }) => {
  return (
    <div className="objectifCard flex flex-col gap-2">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center flex-1">
          <input
            type="checkbox"
            className="lk-input--checkbox"
            onClick={() => onSelect(objectif)}
          />
          <h5 className="font-bold line-clamp-1">{objectif.title}</h5>
          <Badge
            icon={objectif.type === "savings" ? FaPiggyBank : FaMoneyBillWave}
            variant={objectif.type === "savings" ? "info" : "warning"}
            className="ml-auto"
          >
            {objectif.type}
          </Badge>
        </div>

        <div>
          <Tooltip
            trigger={
              <Button variant="link" id="clickable" size="small">
                <FaEllipsisV className="m-auto" />
              </Button>
            }
          >
            <>
              <div
                onClick={() => onEdit(objectif)}
                className=" cursor-pointer hover:bg-gray-100 dark:hover:bg-primary-800 p-2 rounded w-40"
              >
                Edit
              </div>
              <div
                className="cursor-pointer hover:bg-gray-100 dark:hover:bg-primary-800 p-2 rounded w-40"
                onClick={() => onDelete(objectif)}
                color="red"
              >
                Delete
              </div>
            </>
          </Tooltip>
        </div>
      </div>

      <div className=" flex gap-2">
        {objectif.categories.slice(0, 3).map((category, index) => (
          <Badge variant="light" key={index}>
            {category}
          </Badge>
        ))}
      </div>

      <div className=" line-clamp-5 text-sm text-gray-600 dark:text-primary-300">
        {objectif.description}
      </div>

      <div className="mt-auto">
        <div className=" flex items-baseline gap-2">
          <div className={"w-full rounded bg-gray-300 h-2 overflow-hidden"}>
            <div
              className={twMerge(
                "h-full bg-red-500 rounded ",
                objectif.progress >= 50 && "bg-yellow-500",
                objectif.progress >= 100 && "bg-green-500"
              )}
              style={{
                width: `${objectif.progress || 0}%`,
              }}
            ></div>
          </div>
          <span className="text-sm font-bold">
            {objectif.progress > 100 ? 100 : Math.floor(objectif.progress || 0)}
            %
          </span>
        </div>
        <div className=" text-sm text-gray-600 dark:text-primary-400">
          <ObjectifDate objectif={objectif} />
        </div>
      </div>
    </div>
  );
};
