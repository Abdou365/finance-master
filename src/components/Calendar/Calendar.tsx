import { format } from "date-fns";
import { groupBy, padStart } from "lodash";
import { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import ReactDatePicker from "react-datepicker";
import { IconType } from "react-icons";
import { FaArrowLeft, FaArrowRight, FaEdit, FaEllipsisV } from "react-icons/fa";
import { twJoin } from "tailwind-merge";
import { ItemType } from "../../types/item.type";
import Badge from "../Badge/Badge";
import BoxComponent from "../Box/BoxComponent";
import Button from "../Button/Button";
import TabComponent from "../Tab/TabComponent";
import Tooltip from "../Tooltip/Tooltip";
import { generateMonthDaysList } from "./calendar.utils";

const calendarItemButtonClass =
  "bg-gray-100 p-1 border rounded hover:bg-gray-200 dark:bg-primary-800 dark:border-primary-600 dark:hover:bg-primary-700 dark:text-primary-400";

type Props = {
  items: ItemType[];
  actions: {
    label: string;
    icon: IconType;
    onClick: (item: any) => Promise<void>;
  }[];
  onCreate: (item: Partial<ItemType>) => void;
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
  const weekDays = generateDays(selectedDate, 3);
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
  }: {
    item: ItemType;
    variant: "large" | "small";
  }) => {
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
          <div className="flex items-end gap-2">
            <div className="flex-1 space-y-2">
              <div className=" line-clamp-1 font-bold text-sm">
                {item.title}
              </div>
              <div className=" text-xs line-clamp-3">{item.description}</div>
            </div>
            <div
              className={twJoin(
                "text-right text-lg font-bold",
                item.isExpense
                  ? "text-red-500 dark:text-red-400"
                  : "text-green-500 dark:text-green-400"
              )}
            >
              {item.isExpense && "-"}
              {item.value} €
            </div>
          </div>
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
          className={twJoin("flex flex-1 text-sm  place-items-center gap-1 ")}
        >
          <div className=" line-clamp-1 font-bold">{item.title}</div>
          <div className=" ml-auto">{item.value}</div>
          <Button color="gray" variant="link">
            <FaEdit />
          </Button>
        </BoxComponent>
      </div>
    );
  };

  return (
    <div
      className={twJoin(
        "h-full container m-auto flex flex-col "
        // view === "month" && "overflow-x-auto lk-scroll"
      )}
    >
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
      </div>
      <TabComponent
        tabs={[
          { name: "month", label: "Mois" },
          { name: "week", label: "Semaine" },
        ]}
        selectedTab={view}
        onSelectTab={(tabName) => {
          setView(tabName as "month" | "week");
        }}
      />

      {view === "month" && ( // Month view
        <div className="flex flex-col flex-1 container overflow-x-scroll lk-scroll">
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
            className="grid grid-cols-7 align-bottom flex-1  sm:min-w-[1280px] overflow-y-auto"
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
                          onClick={() =>
                            onCreate({
                              date: new Date(
                                currentFormattedDate
                              ).toISOString(),
                            })
                          }
                        >
                          <div>{v2.num}</div>
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
        <div className="flex flex-1">
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
                      className={twJoin(
                        "bg-gray-100 dark:bg-primary-800 flex-1 p-2 space-y-2"
                      )}
                    >
                      <div className=" text-sm font-bold">
                        {format(new Date(currentFormattedDate), "dd MMMM yyyy")}
                      </div>
                      <div
                        className={twJoin(
                          "space-y-1 p-1 h-full",
                          snapshot.isDraggingOver &&
                            "bg-gray-200 dark:bg-primary-700"
                        )}
                      >
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
                                    <CalendarItem variant="large" item={item} />
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
