import { Listbox } from "@headlessui/react";
import { FieldProps } from "@rjsf/utils";
import ReactDatePicker from "react-datepicker";

export const MyCustomWidget = (props: FieldProps) => {
  const handleChange = (data: any) => {
    props.onChange(data);
  };
  if (props.schema.enum) {
    return (
      <Listbox>
        <Listbox.Button
          className={" border px-2 py-1  w-full bg-white rounded"}
        >
          {props.formData}
        </Listbox.Button>
        <Listbox.Options
          className={
            " border absolute p-1 bg-white z-10 cursor-pointer rounded shadow"
          }
        >
          {props.schema.enum.map((value) => (
            <Listbox.Option
              className={
                "py-1 px-2 hover:bg-slate-100 active:bg-primary-100 w-full"
              }
              key={value}
              onClick={() => {
                handleChange(value);
              }}
            >
              {value}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    );
  }

  if (props.schema.type === "string" && props.schema.format === "date") {
    return (
      <ReactDatePicker
        wrapperClassName="w-full"
        required={props.required}
        readOnly={props.readonly}
        selected={props.formData}
        dateFormat="YYYY-MM-dd"
        dateFormatCalendar="YYYY-MM-dd"
        onChange={(date) => handleChange(date)}
        value={props.formData}
      />
    );
  }

  if (props.schema.type === "number") {
    return (
      <input
        required={props.required}
        readOnly={props.readonly}
        type="number"
        onChange={(e) => handleChange(e.target.value)}
        value={props.formData}
      />
    );
  }

  return (
    <input
      required={props.required}
      readOnly={props.readonly}
      type="text"
      onChange={(e) => handleChange(e.target.value)}
      value={props.formData}
    />
  );
};
