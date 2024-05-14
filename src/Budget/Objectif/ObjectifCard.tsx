import { FaCalendarDay, FaExpand } from "react-icons/fa";
import DatePicker from "../../components/DatePicker/DatePicker";
import { ObjectifType } from "../../types/objectif.type";

export const ObjectifCard: React.FC<{ objectif: ObjectifType }> = ({
  objectif,
}) => {
  return (
    <div className="bg-white p-3 rounded border">
      <div className="flex justify-between">
        <div>
          <p className="text-sm text-gray-600">
            Dépénse en Financement inférieur à 3000 €
          </p>
          <h5 className="font-bold ">{objectif.title}</h5>
          <div className="flex">
            <DatePicker
              className=" text-xs font-semibold cursor-pointer w-full"
              showIcon
              calendarIconClassname=" text-xs"
              dateFormat={"YYYY-MM-DD"}
              icon={<FaCalendarDay />}
              value={objectif.from}
            />
            <DatePicker
              className="w-full text-xs font-semibold cursor-pointer"
              showIcon
              calendarIconClassname=" text-xs"
              dateFormat={"YYYY-MM-DD"}
              icon={<FaCalendarDay />}
              value={objectif.to}
            />
          </div>
        </div>
        <button className="btn-small bg-gray-100 rounded mb-auto">
          <FaExpand className="m-auto" />
        </button>
      </div>

      <div className=" flex items-baseline gap-2 mt-3">
        <div className="w-full rounded bg-gray-300 h-2 overflow-hidden">
          <div
            className="h-full bg-primary-500 rounded "
            style={{
              width: `${objectif.progress || 0}%`,
            }}
          ></div>
        </div>
        <span className="text-sm font-bold">
          {Math.floor(objectif.progress || 0)}%
        </span>
      </div>
    </div>
  );
};
