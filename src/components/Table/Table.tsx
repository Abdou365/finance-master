/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Column,
  ColumnFiltersState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useMemo } from "react";
import EditableCells from "../../Budget/Items/EditableCells";
import { compact } from "lodash";
import { twMerge } from "tailwind-merge";
import { useVirtualizer } from "@tanstack/react-virtual";

// Define a type for possible input types
export type TableColumnInputType =
  | "text"
  | "email"
  | "password"
  | "date"
  | "radio"
  | "select"
  | "checkbox"
  | "number";

export type TableColumnDataType = "string" | "date" | "integer" | "boolean";

export type TableDataType = Record<string, unknown>;

export type TableColumnOptionsType = {
  label: string;
  value: string | number | boolean;
}[];

// Define a type for a form field
export interface TableColumnType {
  name: keyof TableDataType;
  label: string;
  type: TableColumnInputType;
  dtatype: TableColumnDataType;
  max?: number;
  min?: number;
  required?: boolean;
  disabled?: boolean;
  size?: number;
  options?: TableColumnOptionsType;
  creatable?: boolean;
}

export interface TableAcion {
  component: (data: any) => React.ReactNode;
  size?: number;
}

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="w-full bg-transparent outline-none"
    />
  );
}

function Filter({ column }: { column: Column<string | number, unknown> }) {
  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};

  return filterVariant === "range" ? (
    <div>
      <div className="flex space-x-2">
        {/* See faceted column filters example for min max values functionality */}
        <DebouncedInput
          type="number"
          value={(columnFilterValue as [number, number])?.[0] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [value, old?.[1]])
          }
          placeholder={`Min`}
        />
        <DebouncedInput
          type="number"
          value={(columnFilterValue as [number, number])?.[1] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [old?.[0], value])
          }
          placeholder={`Max`}
        />
      </div>
      <div className="h-1" />
    </div>
  ) : filterVariant === "select" ? (
    <select
      onChange={(e) => column.setFilterValue(e.target.value)}
      value={columnFilterValue?.toString()}
    >
      {/* See faceted column filters example for dynamic select options */}
      <option value="">All</option>
      <option value="complicated">complicated</option>
      <option value="relationship">relationship</option>
      <option value="single">single</option>
    </select>
  ) : (
    <DebouncedInput
      onChange={(value) => column.setFilterValue(value)}
      placeholder={`Search...`}
      type="text"
      value={(columnFilterValue ?? "") as string}
    />
    // See faceted column filters example for datalist search suggestions
  );
}

type TableComponentProps = {
  tableData: TableDataType[];
  onChange: (data: any) => void;
  rowSelection?: boolean extends TableComponentProps["selectable"]
    ? Record<number, boolean>
    : undefined;
  setRowSelection?: boolean extends TableComponentProps["selectable"]
    ? (data: Record<number, boolean>) => void
    : undefined;
  selectable?: boolean;
  columns: TableColumnType[];
  actions: TableAcion[];
  classNames?: string;
  style?: React.CSSProperties;
};

// Give our default column cell renderer editing superpowers!

const Table: React.FC<TableComponentProps> = ({
  tableData: items,
  onChange,
  selectable,
  columns,
  actions,
  rowSelection,
  setRowSelection,
}) => {
  const [data, setData] = React.useState<TableDataType[]>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const columnHelper = createColumnHelper<TableDataType>();
  const tableContainerRef = React.useRef<HTMLDivElement>(null);

  const updateData = (item: TableDataType) => {
    onChange(item);
  };

  useEffect(() => {
    setData(items);
  }, [items]);

  const tableColumns = useMemo(
    () => [
      selectable &&
        columnHelper.display({
          id: "select",
          size: 0,
          header: (props) => (
            <div className="flex w-full justify-center">
              <input
                checked={props.table.getIsAllRowsSelected()}
                onChange={props.table.getToggleAllRowsSelectedHandler()}
                type="checkbox"
                className="lk-input--checkbox"
              />
            </div>
          ),
          cell: (props) => (
            <div className="flex w-full align-middle justify-center">
              <input
                checked={props.row.getIsSelected()}
                onChange={props.row.getToggleSelectedHandler()}
                type="checkbox"
                className="lk-input--checkbox"
              />
            </div>
          ),
        }),

      ...columns.map((column) => {
        return columnHelper.accessor(column.name, {
          id: column.name,
          header: column.label,
          size: column.size,
          cell: (info) => (
            <EditableCells
              columnOptions={column}
              onChange={updateData}
              {...info}
            />
          ),
        });
      }),

      actions?.length > 0 &&
        columnHelper.display({
          id: "select",
          size: 40,
          cell: (props) => (
            <div className="flex w-full align-middle justify-center">
              {...actions.map((action) => {
                return action.component(props.row.original);
              })}
            </div>
          ),
        }),
    ],
    [columnHelper]
  );
  const table = useReactTable({
    data,
    columns: compact(tableColumns),
    filterFns: {},
    state: {
      columnFilters,
      rowSelection: selectable ? rowSelection : {},
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
    getSortedRowModel: getSortedRowModel(),
    enableRowSelection: true,
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
    onRowSelectionChange: selectable ? setRowSelection : function () {},

    meta: {
      updateData: (rowIndex: number, columnId: any, value: any) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    },
  });

  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer({
    getScrollElement: () => tableContainerRef.current!,
    count: rows?.length,
    overscan: 32,
    estimateSize: () => 50,
    measureElement:
      typeof window !== "undefined" &&
      navigator.userAgent.indexOf("Firefox") === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
  });

  return (
    <>
      <div ref={tableContainerRef} className="">
        <table className="w-full bg-gray-50 dark:bg-primary-950 text-sm text-left">
          <thead className="text-xs  border-b dark:border-b-primary-600 uppercase  dark:text-primary-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      style={{
                        maxWidth: header.column.getSize(),
                        width: header.column.getSize(),
                      }}
                      className="px-2 py-2"
                      key={header.id}
                      colSpan={header.colSpan}
                    >
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            {...{
                              className: header.column.getCanSort()
                                ? "cursor-pointer select-none"
                                : "",
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: " 🔼",
                              desc: " 🔽",
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                          {header.column.getCanFilter() ? (
                            <div>
                              <Filter column={header.column} />
                            </div>
                          ) : null}
                        </>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
        </table>
      </div>
      <div ref={tableContainerRef} className="overflow-auto flex-1  ">
        <table className="w-full text-sm text-left">
          <tbody>
            {rowVirtualizer.getVirtualItems().length > 0
              ? rowVirtualizer.getVirtualItems().map((virtualRow, index) => {
                  const row = rows[virtualRow.index];
                  return (
                    <tr
                      className={twMerge(
                        "g-white",
                        table.getState().rowSelection[index] &&
                          "bg-primary-100 dark:bg-primary-700"
                      )}
                      style={{
                        height: `${virtualRow.size}px`,
                        transform: `translateY(${
                          virtualRow.start - index * virtualRow.size
                        }px)`,
                      }}
                      key={row.id}
                    >
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <td
                            className={twMerge(
                              " dark:bg-primary-950 bg-gray-50  border dark:border-primary-600 py-1 px-2 font-medium",
                              table.getState().rowSelection[index] &&
                                "text-primary-500"
                            )}
                            style={{
                              maxWidth: cell.column.getSize(),
                              width: cell.column.getSize(),
                            }}
                            key={cell.id}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })
              : rows.map((row) => {
                  return (
                    <tr
                      className={twMerge(
                        "g-white",
                        table.getState().rowSelection[row.index] &&
                          "bg-primary-100 dark:bg-primary-700"
                      )}
                      key={row.id}
                    >
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <td
                            className={twMerge(
                              " dark:bg-primary-950 bg-gray-50  border dark:border-primary-600 py-1 px-2 font-medium",
                              table.getState().rowSelection[row.index] &&
                                "text-primary-500"
                            )}
                            style={{
                              maxWidth: cell.column.getSize(),
                              width: cell.column.getSize(),
                            }}
                            key={cell.id}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
