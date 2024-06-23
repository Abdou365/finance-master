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
  placeholder?: string;
  value?: any;
  onChange?: (value: any) => void;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  hidden?: boolean;
  min?: number;
  max?: number;
  step?: number;
  pattern?: string;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  form?: string;
  list?: string;
  maxLength?: number;
  minLength?: number;
  size?: number;
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
            placeholderText={field.placeholder || "Select a date"}
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
            placeholderText={field.placeholder || "Select a date range"}
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
            placeholder={field.placeholder}
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
            placeholder={field.placeholder}
          />
        );
      }
      case "number": {
        const { min, max, step, disabled, hidden, required, readOnly } = field;
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
            placeholder={field.placeholder}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            hidden={hidden}
            required={required}
            readOnly={readOnly}
          />
        );
      }
      default: {
        const {
          hidden,
          disabled,
          required,
          readOnly,
          placeholder: plqceholder,
        } = field;
        return (
          <input
            className="input w-full"
            type={field.type}
            {...register(field.name, {
              onChange: (event) => {
                handleChange(field.name, event.target.value);
              },
            })}
            placeholder={plqceholder}
            hidden={hidden}
            disabled={disabled}
            required={required}
            readOnly={readOnly}
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
