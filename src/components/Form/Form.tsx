// import { format } from "date-fns";
import React, { HTMLInputTypeAttribute } from "react";
import ReactDatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { FaCalendar } from "react-icons/fa";
import Select from "react-select";
import { formatOptions } from "../../utils/formatOptions";
import Textarea from "react-textarea-autosize";

// import { Select } from "../Select/Select";

interface FieldType {
  type: HTMLInputTypeAttribute | "date-range";
  name: string;
  label: string;
  options?: { value: string; label: string }[];
  defaultValue?: string;
  format?: string;
  multiple?: boolean;
}

interface FormProps {
  fields: FieldType[];
  data?: any;
  onChange: (props: { name: string; value: any }) => void;
}

const FormComponent: React.FC<FormProps> = (props) => {
  const { fields, data, onChange } = props;
  const { register, watch, setValue } = useForm<{
    [key: string]: string;
  }>({
    defaultValues: data,
    mode: "onChange",
  });

  const handleChange = (name: string, value: any) => {
    setValue(name, value);
    onChange({ name, value });
  };

  const renderFormField = (field: FieldType) => {
    switch (field.type) {
      case "date":
      case "datetime-local": {
        return (
          <ReactDatePicker
            {...register(field.name)}
            wrapperClassName="w-full"
            className="input w-full"
            icon={<FaCalendar />}
            showIcon
            selected={watch(field.name)}
            dateFormat={field.format || "YYYY-MM-dd"}
            onChange={(date) => {
              handleChange(field.name, date);
            }}
            value={watch(field.name)}
          />
        );
      }
      case "date-range": {
        return (
          <ReactDatePicker
            {...register(field.name)}
            wrapperClassName="w-full"
            className="input w-full text-center"
            icon={<FaCalendar />}
            selectsRange
            showIcon
            startDate={watch(field.name)["from"]}
            endDate={watch(field.name)["to"]}
            dateFormat={"YYYY-MM-dd"}
            onChange={(date) => {
              handleChange(field.name, {
                to: date[1],
                from: date[0],
              });
            }}
          />
        );
      }
      case "textarea": {
        return (
          <Textarea
            className="input w-full"
            {...register(field.name, {
              onChange: (event) => {
                handleChange(field.name, event.target.value);
              },
            })}
          />
        );
      }
      case "select": {
        return (
          <Select
            onChange={(value) => {
              if (field.multiple) {
                handleChange(
                  field.name,
                  value?.map((v) => v.value)
                );
              } else {
                handleChange(field.name, value.value);
              }
            }}
            isMulti={field.multiple}
            options={formatOptions(field.options)}
            isClearable
            isSearchable
            defaultValue={
              field.multiple
                ? data[field.name]?.map((e) => ({ label: e, value: e }))
                : { value: data[field.name], label: data[field.name] }
            }
          />
        );
      }
      case "number": {
        return (
          <input
            className="input w-full"
            type={field.type}
            {...register(field.name, {
              onChange: (event) => {
                handleChange(field.name, +event.target.value);
              },
            })}
          />
        );
      }
      default: {
        return (
          <input
            className="input w-full"
            type={field.type}
            {...register(field.name, {
              onChange: (event) => {
                handleChange(field.name, event.target.value);
              },
            })}
          />
        );
      }
    }
  };

  return (
    <form>
      {fields.map((field, index) => (
        <div key={index}>
          <label>{field.label}</label>
          {renderFormField(field)}
        </div>
      ))}
    </form>
  );
};

export default FormComponent;
