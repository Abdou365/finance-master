import { Draggable, Droppable } from "@hello-pangea/dnd";
import { format } from "date-fns";
import { groupBy, padStart } from "lodash";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { IconType } from "react-icons";
import { FaArrowLeft, FaArrowRight, FaEllipsisV, FaPlus } from "react-icons/fa";
import Textarea from "react-textarea-autosize";
import { twJoin, twMerge } from "tailwind-merge";
import { ItemType } from "../../types/item.type";
import Badge from "../Badge/Badge";
import BoxComponent from "../Box/BoxComponent";
import Button from "../Button/Button";
import TabComponent from "../Tab/TabComponent";
import Tooltip from "../Tooltip/Tooltip";
import { generateMonthDaysList } from "./calendar.utils";
import NumberInput from "../Input/NumberInput";

const calendarItemButtonClass =
  "bg-gray-100 p-1 border rounded hover:bg-gray-200 dark:bg-primary-800 dark:border-primary-600 dark:hover:bg-primary-700 dark:text-primary-400";

const AddButtonComponent = ({
  onCreate,
  currentFormattedDate,
}: {
  onCreate: (item: Partial<ItemType>) => void;
  currentFormattedDate: string;
}) => {
  return (
    <button
      className={calendarItemButtonClass}
      onClick={() =>
        onCreate({
          date: new Date(currentFormattedDate).toISOString(),
        })
      }
    >
      <FaPlus />
    </button>
  );
};

type Props = {
  items: ItemType[];
  actions: {
    label: string;
    icon: IconType;
    onClick: (item: any) => Promise<void>;
  }[];
  onCreate: (item: Partial<ItemType>) => void;
  onChange: (items: ItemType) => void;
};

const days = {
  0: "Lun",
  1: "Mar",
  2: "Mer",
  3: "Jeu",
  4: "Ven",
  5: "Sam",
  6: "Dim",
};

const generateDays = (
  date: Date,
  numberOfDays: number = 1
): {
  day: number;
  num: number;
  month: number;
  year: number;
}[] => {
  const days = [];

  for (let i = 0; i < numberOfDays; i++) {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + i);
    days.push({
      day: newDate.getDay(),
      num: newDate.getDate(),
      month: newDate.getMonth(),
      year: newDate.getFullYear(),
    });
  }

  return days;
};

const Calendar = (props: Props) => {
  const { items, onCreate } = props;
  const [view, setView] = useState<"month" | "week">("month");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [displayedDays, setDisplayedDays] = useState<number>(3);

  const monthDays = generateMonthDaysList(selectedDate.toISOString());
  const weekDays = generateDays(selectedDate, displayedDays);
  const today = () => {
    const date = generateDays(new Date(), 1)[0];
    return `${date.year}-${padStart(`${date.month + 1}`, 2, "0")}-${padStart(
      `${date.num}`,
      2,
      "0"
    )}`;
  };

  const daysEntries = Object.entries(days);
  const formatDate = (date: string) => {
    return format(new Date(date), "yyyy-MM-dd");
  };
  const simplifiedItems = items.map((i) => {
    return {
      ...i,
      simplifiedDate: formatDate(i.date),
    };
  });
  const itemsByDate = groupBy(simplifiedItems, "simplifiedDate");

  const moveDateForward = () => {
    setSelectedDate((prev) => {
      const date = new Date(prev);
      if (view === "week") {
        date.setDate(date.getDate() + 1);
        return date;
      } else {
        date.setMonth(date.getMonth() + 1);
      }
      return date;
    });
  };

  const moveDateBackward = () => {
    setSelectedDate((prev) => {
      const date = new Date(prev);
      if (view === "month") {
        date.setMonth(date.getMonth() - 1);
      } else {
        date.setDate(date.getDate() - 1);
      }
      return date;
    });
  };

  const CalendarItem = ({
    item,
    variant = "small",
    onChange,
  }: {
    item: ItemType;
    variant: "large" | "small";
    onChange: (item: ItemType) => void;
  }) => {
    const handleChange = (e: any) => {
      e.preventDefault();
      e.stopPropagation();
      onChange({ ...item, [e.target.name]: e.target.value });
    };
    if (variant === "large") {
      return (
        <BoxComponent className={twJoin(" place-items-start ")}>
          <div className=" mb-2 flex flex-row-reverse justify-between items-start">
            <Tooltip
              mode="click"
              trigger={
                <button className={calendarItemButtonClass}>
                  <FaEllipsisV />
                </button>
              }
            >
              <>
                {props.actions.map((action) => {
                  return (
                    <Button variant="link" onClick={() => action.onClick(item)}>
                      <action.icon />
                      <div>{action.label}</div>
                    </Button>
                  );
                })}
              </>
            </Tooltip>
            <Badge variant="primary">{item.category}</Badge>
          </div>
          <Textarea
            className="font-bold text-sm w-full bg-transparent hover:bg-gray-100 dark:hover:bg-primary-800 line-clamp-2"
            name="title"
            onBlur={handleChange}
            defaultValue={item.title}
          />
          <span
            className={twMerge(
              'after:content-["€"] whitespace-pre w-12 text-right',
              item.isExpense
                ? "text-red-500 dark:text-red-400"
                : "text-green-500 dark:text-green-400"
            )}
          >
            <NumberInput
              defaultValue={item.value}
              name="value"
              min={0}
              className={twJoin("text-xl font-bold bg-transparent")}
              onBlur={handleChange}
            />
          </span>
        </BoxComponent>
      );
    }

    return (
      <div
        className={twJoin("flex gap-1")}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onMouseEnter={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <div
          className={twJoin(
            "w-[2px]",
            item.isExpense ? "bg-red-500" : " bg-green-500"
          )}
        ></div>
        <BoxComponent
          className={twJoin(
            "flex flex-1 text-sm  place-items-center gap-1 items-start "
          )}
        >
          <Textarea
            className="w-full bg-transparent lk-scroll"
            name="title"
            maxRows={3}
            onBlur={handleChange}
            defaultValue={item.title}
            role="textbox"
          />
          <span
            className={twMerge(
              'after:content-["€"] whitespace-pre',
              item.isExpense
                ? "text-red-500 dark:text-red-400"
                : "text-green-500 dark:text-green-400"
            )}
          >
            <NumberInput
              name="value"
              min={0}
              onBlur={handleChange}
              defaultValue={item.value}
              className="text-right w-2"
            />
          </span>
          <Tooltip
            mode="click"
            trigger={
              <button className={calendarItemButtonClass}>
                <FaEllipsisV />
              </button>
            }
          >
            <>
              {props.actions.map((action) => {
                return (
                  <Button variant="link" onClick={() => action.onClick(item)}>
                    <action.icon />
                    <div>{action.label}</div>
                  </Button>
                );
              })}
            </>
          </Tooltip>
        </BoxComponent>
      </div>
    );
  };

  return (
    <div className={twJoin("h-full container m-auto flex flex-col")}>
      <div className="flex gap-1">
        <Button variant="outlined" onClick={moveDateBackward}>
          <FaArrowLeft />
        </Button>
        <ReactDatePicker
          className="btn-primary btn-primary-outlined"
          selected={selectedDate}
          showMonthYearPicker={view === "month"}
          onChange={(date) => setSelectedDate(date as Date)}
          dateFormat={view === "month" ? "MMMM YYYY" : " dd MMMM yyyy"}
        />
        <Button variant="outlined" onClick={moveDateForward}>
          <FaArrowRight />
        </Button>
        {view === "week" && (
          <input
            min={1}
            max={7}
            type="number"
            className="w-16 bg-red-50  input"
            onChange={(v) => setDisplayedDays(+v.target.value)}
            value={displayedDays}
          />
        )}
      </div>
      <TabComponent
        tabs={[
          { name: "month", label: "Mois" },
          { name: "week", label: "Jour" },
        ]}
        selectedTab={view}
        onSelectTab={(tabName) => {
          setView(tabName as "month" | "week");
        }}
      />

      {view === "month" && ( // Month view
        <div className="flex flex-col flex-1 container overflow-x-scroll lk-scroll ">
          <div
            className={twJoin(
              "grid grid-cols-7 align-bottom ",
              view === "month" && "sm:min-w-[1280px]"
            )}
          >
            {view === "month" &&
              daysEntries.map((d) => {
                return <div className=" text-center">{d[1]} </div>;
              })}
          </div>
          <div
            style={{
              gridTemplateRows: `repeat(${monthDays.days.length}, 1fr)`,
            }}
            className={twJoin(
              `grid grid-cols-7 align-bottom flex-1  sm:min-w-[1280px] overflow-y-auto`
            )}
          >
            {monthDays.days.map((v) => {
              return v.map((v2) => {
                if (v2 === null) {
                  return (
                    <div
                      className={twJoin(
                        "border dark:border-primary-600",
                        v2 === null && "bg-gray-100 dark:bg-primary-800"
                      )}
                    ></div>
                  );
                }

                const currentFormattedDate = `${v2?.year}-${padStart(
                  `${(v2?.month || 0) + 1}`,
                  2,
                  "0"
                )}-${padStart(`${v2?.num}`, 2, "0")}`;

                const cellItems = itemsByDate[currentFormattedDate] || [];

                return (
                  <Droppable droppableId={currentFormattedDate}>
                    {(provided) => {
                      return (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={twJoin(
                            "border dark:border-primary-600 hover:bg-gray-100 dark:hover:bg-primary-900 overflow-hidden flex-col flex",
                            today() === currentFormattedDate &&
                              "border dark:bg-secondary-900 border-secondary-600 bg-secondary-100"
                          )}
                        >
                          <div className="flex justify-between m-1">
                            <span className="text-xs">{v2.num}</span>
                            <AddButtonComponent
                              onCreate={onCreate}
                              currentFormattedDate={currentFormattedDate}
                            />
                          </div>
                          <div className=" space-y-1 m-1 overflow-auto flex-1 lk-scroll">
                            {cellItems.map((item, index) => {
                              return (
                                <Draggable draggableId={item.id} index={index}>
                                  {(provided) => {
                                    return (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                      >
                                        <CalendarItem
                                          onChange={props.onChange}
                                          item={item}
                                          variant="small"
                                        />
                                      </div>
                                    );
                                  }}
                                </Draggable>
                              );
                            })}
                          </div>
                        </div>
                      );
                    }}
                  </Droppable>
                );
              });
            })}
          </div>
        </div>
      )}
      {view === "week" && (
        <div
          className={twMerge(
            "flex flex-1  container overflow-auto",
            displayedDays > 5 && "shadow-inner-lg "
          )}
        >
          {weekDays.map((v2) => {
            const currentFormattedDate = `${v2?.year}-${padStart(
              `${(v2?.month || 0) + 1}`,
              2,
              "0"
            )}-${padStart(`${v2?.num}`, 2, "0")}`;

            const cellItems = itemsByDate[currentFormattedDate] || [];

            return (
              <Droppable droppableId={currentFormattedDate}>
                {(provided, snapshot) => {
                  return (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={twMerge(
                        " border dark:border-primary-600 dark:bg-primary-950 flex-1 p-2 space-y-2 min-w-64",
                        snapshot.isDraggingOver &&
                          "bg-gray-200 dark:bg-primary-900"
                      )}
                    >
                      <div className=" text-sm font-bold flex justify-between">
                        <span>
                          {format(
                            new Date(currentFormattedDate),
                            "dd MMMM yyyy"
                          )}
                        </span>
                        <AddButtonComponent
                          onCreate={onCreate}
                          currentFormattedDate={currentFormattedDate}
                        />
                      </div>
                      <div className={twJoin("space-y-1 p-1 ")}>
                        {cellItems.map((item, index) => {
                          return (
                            <Draggable draggableId={item.id} index={index}>
                              {(provided) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <CalendarItem
                                      onChange={props.onChange}
                                      variant="large"
                                      item={item}
                                    />
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                      </div>
                    </div>
                  );
                }}
              </Droppable>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Calendar;
