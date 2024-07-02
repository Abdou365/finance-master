/* eslint-disable @typescript-eslint/no-explicit-any */
import { CellContext } from "@tanstack/react-table";
import { format } from "date-fns";
import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import DatePicker from "../../components/DatePicker/DatePicker";
import CustomSelect from "./CompactSelect";
import { TableColumnType } from "../../components/Table/Table";

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
        className="outline-none w-full bg-transparent dark:text-primary-50"
        clearButtonTitle="Effacer"
        name={props.column.id}
        dateFormat={"YYYY-MM-dd"}
        withPortal
        portalId="root-portal"
        value={format(props.cell.getValue(), "yyyy-MM-dd")}
        selected={inputState as any}
        onSelect={(date) => {
          props.onChange({
            ...props.row.original,
            [props.column.id]: date.toISOString(),
          });
        }}
        onChange={() => {}}
      />
    );
  }

  if (props.columnOptions.type === "number") {
    return (
      <input
        className="outline-none text-right w-full bg-transparent dark:text-primary-50"
        name={props.column.id}
        style={{ resize: "none" }}
        defaultValue={inputState}
        onChange={(e) => setInputState(+e.target.value as any)}
        type={props.columnOptions.type}
        onBlur={handleUpdate}
      />
    );
  }

  if (props.columnOptions.type === "select" && props.columnOptions.options) {
    return (
      // <TableSelectComponent />
      // <Select
      //   state={inputState}
      //   options={props.columnOptions.options}
      //   onChange={(data) => {
      //     props.onChange({
      //       ...props.row.original,
      //       [props.column.id]: data,
      //     });
      //   }}
      // />
      <CustomSelect
        initialValue={inputState}
        onChange={(value) =>
          props.onChange({
            ...props.row.original,
            [props.column.id]: value,
          })
        }
        compact
        options={props.columnOptions.options}
        creatable={props.columnOptions.creatable}
      />
      // <Select
      //   defaultValue={{ value: inputState, label: inputState }}
      //   unstyled
      //   onCreateOption={(value) =>
      //     props.onChange({
      //       ...props.row.original,
      //       [props.column.id]: value,
      //     })
      //   }
      //   classNames={{
      //     control() {
      //       return `dark:bg-primary-700 bg-white `;
      //     },
      //     menu() {
      //       return "bg-white dark:bg-primary-700 border dark:border-primary-600 rounded mt-1 shadow-lg dark:shadow-primary-500";
      //     },
      //     option(props) {
      //       return ` px-1 py- cursor-pointer ${
      //         props.isSelected ? "bg-primary-500 text-white" : ""
      //       } ${
      //         props.isFocused && !props.isSelected
      //           ? "bg-gray-200 dark:bg-primary-800"
      //           : ""
      //       }`;
      //     },
      //     multiValue() {
      //       return "bg-primary-100 dark:bg-primary-600 m-1  text-primary-700 dark:text-primary-100 rounded px-2";
      //     },
      //     multiValueLabel() {
      //       return "text-primary-700 dark:text-primary-100";
      //     },
      //     multiValueRemove() {
      //       return "cursor-pointer hover:bg-primary-500 hover:text-white rounded";
      //     },
      //   }}
      //   options={formatOptions(props.columnOptions.options)}
      //   onChange={(value) =>
      //     props.onChange({
      //       ...props.row.original,
      //       [props.column.id]: value.value,
      //     })
      //   }
      // />
    );
  }

  return (
    <TextareaAutosize
      className="outline-none appearance-none w-full bg-transparent dark:text-primary-50"
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
