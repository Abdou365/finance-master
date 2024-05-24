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
import EditableCells from "./EditableCells";
import { compact } from "lodash";

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

// Define a type for the data types
// type DataType = 'string' | 'date' | 'integer' | 'boolean';

export type TableDataType = Record<string, unknown>;

export type TableColumnOptionsType =
  | string[]
  | {
      label: string;
      value: any;
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
  options?: TableColumnOptionsType; // Only used for 'radio' and 'select' input types
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

function Filter({ column }: { column: Column<any, unknown> }) {
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

type Props = {
  tableData: TableDataType[];
  onChange: (data: any) => void;
  onSelect?: (data: any) => void;
  selectable?: boolean;
  columns: TableColumnType[];
  actions: TableAcion[];
};

// Give our default column cell renderer editing superpowers!

const Table: React.FC<Props> = ({
  tableData: items,
  onChange,
  onSelect,
  selectable,
  columns,
  actions,
}) => {
  const [data, setData] = React.useState<TableDataType[]>([]);
  const [rowSelection, setRowSelection] = React.useState({});

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const columnHelper = createColumnHelper<TableDataType>();

  const updateData = (item: TableDataType) => {
    onChange(item);
  };

  useEffect(() => {
    setData(items);
  }, [items]);

  useEffect(() => {
    onSelect && onSelect(rowSelection);
  });

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

      actions.length > 0 &&
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
      rowSelection,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
    getSortedRowModel: getSortedRowModel(),
    enableRowSelection: true,
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
    onRowSelectionChange: setRowSelection,

    meta: {
      updateData: (rowIndex: number, columnId: any, value: any) => {
        // Skip page index reset until after next rerender
        // skipAutoResetPageIndex()
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

  return (
    <div>
      <table className="bg-white w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          style={{ zIndex: 1 }}
          className="text-xs text-gray-700 border-b uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky  top-0"
        >
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
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              className="g-white border-b dark:bg-gray-800 dark:border-gray-700"
              key={row.id}
            >
              {row.getVisibleCells().map((cell) => {
                return (
                  <td
                    className=" py-2 px-2 font-medium"
                    style={{
                      maxWidth: cell.column.getSize(),
                      width: cell.column.getSize(),
                    }}
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

// columnHelper.accessor("category", {
//   cell: (info) => (
//     <EditableCells options={categories} onChange={updateData} {...info} />
//   ),
// }),
// columnHelper.accessor("created_at", {
//   cell: (info) => info.getValue(),
// }),
// columnHelper.accessor("description", {
//   cell: (info) => <EditableCells onChange={updateData} {...info} />,
// }),
// columnHelper.accessor("isExpense", {
//   cell: (info) => (
//     // <div className="w-full text-center">
//     <input
//       className="lk-input--switch"
//       type="checkbox"
//       name=""
//       id=""
//       checked={info.getValue()}
//     />
//     // </div>
//   ),
// }),
// columnHelper.accessor("value", {
//   cell: (info) => info.getValue(),
// }),
// columnHelper.accessor("title", {
//   cell: (info) => <EditableCells onChange={updateData} {...info} />,
// }),
