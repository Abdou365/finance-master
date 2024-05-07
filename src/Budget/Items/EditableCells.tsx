/* eslint-disable @typescript-eslint/no-explicit-any */
import { CellContext } from "@tanstack/react-table";
import { formatInTimeZone } from "date-fns-tz";
import TextareaAutosize from "react-textarea-autosize";

import { Listbox } from "@headlessui/react";
import { keyBy } from "lodash";
import React, { useState } from "react";
import { TableColumnType } from "./ItemsTable";
// import { format } from "date-fns";
import ReactDatePicker from "react-datepicker";
import DatePicker from "../../components/DatePicker/DatePicker";

interface Props extends CellContext<any, string> {
  onChange: (item: any) => void;
  columnOptions: TableColumnType;
}

const formatOptions = (options: { name: string; value: any }[] | string[]) => {
  return options.map((option: any) => {
    if (typeof option === "string") {
      return {
        name: option,
        value: option,
      };
    }
    return option;
  });
};

const EditableCells: React.FC<Props> = (props) => {
  const [inputState, setInputState] = useState(props.getValue());
  const handleUpdate = () => {
    props.onChange({
      ...props.row.original,
      [props.column.id]: inputState,
    });
  };

  if (props.columnOptions.type === "date") {
    return (
      <DatePicker
        className="outline-none text-right w-full"
        name={props.column.id}
        dateFormat={"YYYY-MM-dd"}
        value={props.cell.getValue()}
        selected={inputState}
        onSelect={(date) => {
          props.onChange({
            ...props.row.original,
            [props.column.id]: formatInTimeZone(
              date,
              Intl.DateTimeFormat().resolvedOptions().timeZone,
              "yyyy-MM-dd"
            ),
          });
        }}
        type={props.columnOptions.type}
      />
    );
  }

  if (props.columnOptions.type === "number") {
    return (
      <input
        className="outline-none text-right w-full"
        name={props.column.id}
        style={{ resize: "none" }}
        defaultValue={inputState}
        onChange={(e) => setInputState(e.target.value)}
        type={props.columnOptions.type}
        onBlur={handleUpdate}
      />
    );
  }

  if (props.columnOptions.type === "select" && props.columnOptions.options) {
    const options = formatOptions(props.columnOptions.options);
    const optionByKey = keyBy(options, "value");
    return (
      <Listbox>
        <Listbox.Button className="max-w-full">
          {optionByKey[inputState]?.name || inputState}
        </Listbox.Button>

        <Listbox.Options className="border absolute  bg-white z-10 cursor-pointer rounded shadow">
          {options.map((option) => {
            return (
              <Listbox.Option
                className="py-1 px-2 hover:bg-slate-100 active:bg-primary-100 w-full"
                key={option.name}
                value={option.value}
                onClick={() => {
                  props.onChange({
                    ...props.row.original,
                    [props.column.id]: option.value,
                  });
                }}
              >
                {option.name}
              </Listbox.Option>
            );
          })}
        </Listbox.Options>
      </Listbox>
    );
  }

  return (
    <TextareaAutosize
      className="outline-none appearance-none w-full"
      name={props.column.id}
      style={{ resize: "none" }}
      defaultValue={inputState}
      onChange={(e) => setInputState(e.target.value)}
      rows={1}
      onBlur={() => {
        props.onChange({
          ...props.row.original,
          [props.column.id]: inputState.replace("\t", "\n"),
        });
      }}
    />
  );
};

export default EditableCells;
