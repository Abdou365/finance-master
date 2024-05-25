import { FaCalendarDay, FaEllipsisV } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import Button from "../../components/Button/Button";
import DatePicker from "../../components/DatePicker/DatePicker";
import { ObjectifType } from "../../types/objectif.type";
import "./ObjectifCard.scss";
import Tooltip from "../../components/Tooltip/Tooltip";

export const ObjectifCard: React.FC<{
  objectif: ObjectifType;
  onSelect: (objectif: ObjectifType) => void;
  onEdit: (objectif: ObjectifType) => void;
  onDelete: (objectif: ObjectifType) => void;
}> = ({ objectif, onSelect, onEdit, onDelete }) => {
  return (
    <div className="objectifCard">
      <div className="flex justify-between">
        <div>
          <div className="flex gap-2 items-center">
            <input
              type="checkbox"
              className="lk-input--checkbox"
              onClick={() => onSelect(objectif)}
            />
            <h5 className="font-bold line-clamp-1">{objectif.title}</h5>
          </div>
          <div className="flex">
            <DatePicker
              className=" text-xs bg-transparent font-semibold cursor-pointer w-full"
              showIcon
              calendarIconClassname=" text-xs"
              dateFormat={"YYYY-MM-DD"}
              icon={<FaCalendarDay />}
              value={objectif.from}
            />
            <DatePicker
              className="w-full bg-transparent text-xs font-semibold cursor-pointer"
              showIcon
              calendarIconClassname=" text-xs"
              dateFormat={"YYYY-MM-DD"}
              icon={<FaCalendarDay />}
              value={objectif.to}
            />
          </div>
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
              <Button onClick={() => onEdit(objectif)} variant="link">
                Edit
              </Button>
              <Button
                onClick={() => onDelete(objectif)}
                color="red"
                variant="link"
              >
                Delete
              </Button>
            </>
          </Tooltip>
        </div>
      </div>

      <div className=" flex items-baseline gap-2 mt-3">
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
          {objectif.progress > 100 ? 100 : Math.floor(objectif.progress || 0)}%
        </span>
      </div>
    </div>
  );
};
