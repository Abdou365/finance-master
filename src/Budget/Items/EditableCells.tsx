/* eslint-disable @typescript-eslint/no-explicit-any */
import { CellContext } from "@tanstack/react-table";
import TextareaAutosize from "react-textarea-autosize";

import React, { useState } from "react";
import { TableColumnType } from "./ItemsTable";
// import { format } from "date-fns";
import { format } from "date-fns";
import DatePicker from "../../components/DatePicker/DatePicker";
import { Select } from "../../components/Select/Select";

interface Props extends CellContext<any, string> {
  onChange: (item: any) => void;
  columnOptions: TableColumnType;
}

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
        value={format(props.cell.getValue(), "yyyy-MM-dd")}
        selected={inputState}
        onSelect={(date) => {
          props.onChange({
            ...props.row.original,
            [props.column.id]: date.toISOString(),
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
        onChange={(e) => setInputState(+e.target.value)}
        type={props.columnOptions.type}
        onBlur={handleUpdate}
      />
    );
  }

  if (props.columnOptions.type === "select" && props.columnOptions.options) {
    return (
      <Select
        state={inputState}
        options={props.columnOptions.options}
        onChange={(data) => {
          props.onChange({
            ...props.row.original,
            [props.column.id]: data,
          });
        }}
      />
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
