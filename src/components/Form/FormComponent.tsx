/* eslint-disable @typescript-eslint/no-explicit-any */
// import { format } from "date-fns";
import React, { HTMLInputTypeAttribute } from "react";
import ReactDatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { FaCalendar } from "react-icons/fa";
import Textarea from "react-textarea-autosize";
import CustomSelect from "../../Budget/Items/CompactSelect";
import Button from "../Button/Button";
import "./FormComponent.scss";

export interface FieldType {
  type: HTMLInputTypeAttribute | "date-range";
  name: string;
  label?: string;
  options?: { value: unknown; label: string }[];
  defaultValue?: string;
  format?: string;
  multiple?: boolean;
  description?: string;
  condition?: (data: Record<string, any>) => boolean;
}

interface FormProps {
  fields: FieldType[];
  data?: any;
  onChange?: (props: { name: string; value: any }) => void;
  onSubmit?: (data: Record<string, any>) => void;
  submitButtonText?: string;
}

const FormComponent: React.FC<FormProps> = (props) => {
  const {
    fields,
    data,
    onChange,
    onSubmit,
    submitButtonText = "Valider",
  } = props;
  const { register, watch, setValue } = useForm<typeof data>({
    defaultValues: data,
    mode: "onChange",
  });

  const handleChange = (name: string, value: any) => {
    console.log({ name, value });

    setValue(name, value);
    if (onChange) onChange({ name, value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (props.onSubmit) {
      props.onSubmit(watch());
    }
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
              handleChange(field.name, date?.toISOString());
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
                to: date[1]?.toISOString(),
                from: date[0]?.toISOString(),
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
          <CustomSelect
            options={field.options!}
            initialValue={watch(field.name)}
            isMulti={field.multiple}
            onChange={(value) => handleChange(field.name, value)}
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
              valueAsNumber: true,
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

  const FormWrapper = onSubmit ? "form" : "div";

  return (
    <FormWrapper onSubmit={handleSubmit} className="lk--form">
      {fields
        .filter((field) => {
          return field.condition ? !!field.condition(watch()) : true;
        })
        .map((field, index) => {
          return (
            <div key={index} className="flex flex-col gap-1 lk--form--item">
              {field.label && (
                <label className=" lk--form--label">{field.label}</label>
              )}
              {field.description && (
                <p className=" lk--form--description">{field.description}</p>
              )}
              {renderFormField(field)}
            </div>
          );
        })}
      {onSubmit && (
        <Button className="w-full" onClick={handleSubmit}>
          {submitButtonText}
        </Button>
      )}
    </FormWrapper>
  );
};

export default FormComponent;
