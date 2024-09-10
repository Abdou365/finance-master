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
  defaultValue?: any | ((data: Record<string, any>) => any);
  format?: string;
  multiple?: boolean;
  description?: string;
  condition?: (data: Record<string, any>) => boolean;
  placeholder?: string | ((data: Record<string, any>) => string);
  value?: any;
  onChange?: (value: any) => void;
  required?: boolean | ((data: Record<string, any>) => boolean);
  disabled?: boolean | ((data: Record<string, any>) => boolean);
  readOnly?: boolean | ((data: Record<string, any>) => boolean);
  hidden?: boolean | ((data: Record<string, any>) => boolean);
  min?: number | ((data: Record<string, any>) => number);
  max?: number | ((data: Record<string, any>) => number);
  step?: number | ((data: Record<string, any>) => number);
  pattern?: string;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  autoComplete?: string;
  autoFocus?: boolean | ((data: Record<string, any>) => boolean);
  form?: string;
  list?: string;
  maxLength?: number;
  minLength?: number;
  size?: number;
}

interface FormProps {
  fields: FieldType[];
  data?: any;
  onChange?: (
    props: { name: string; value: any },
    formState: Record<string, any>
  ) => void;
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
    setValue(name, value);
    if (onChange) onChange({ name, value }, watch());
  };

  const handleSubmit = (e: SubmitEvent) => {
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
        const { hidden, disabled, required, readOnly, placeholder, ...rest } =
          field;
        return (
          <ReactDatePicker
            {...register(field.name)}
            {...rest}
            wrapperClassName="w-full"
            className="input w-full"
            icon={<FaCalendar />}
            showIcon
            selected={watch(field.name)}
            dateFormat={field.format || "YYYY-MM-dd"}
            onChange={(date) => {
              handleChange(field.name, date?.toISOString());
            }}
            placeholderText={
              typeof placeholder === "string"
                ? placeholder
                : placeholder?.(watch())
            }
            value={watch(field.name)}
            hidden={typeof hidden === "boolean" ? hidden : hidden?.(watch())}
            disabled={
              typeof disabled === "boolean" ? disabled : disabled?.(watch())
            }
            required={
              typeof required === "boolean" ? required : required?.(watch())
            }
            readOnly={
              typeof readOnly === "boolean" ? readOnly : readOnly?.(watch())
            }
          />
        );
      }
      case "date-range": {
        const {
          hidden,
          disabled,
          required,
          readOnly,
          placeholder,
          name,
          ...rest
        } = field;
        return (
          <ReactDatePicker
            {...register(name)}
            wrapperClassName="w-full"
            className="input w-full text-center"
            icon={<FaCalendar />}
            selectsRange
            showIcon
            placeholderText={
              typeof placeholder === "string"
                ? placeholder
                : placeholder?.(watch()) || "Select a date range"
            }
            startDate={watch(name)["from"]}
            endDate={watch(name)["to"]}
            dateFormat={"YYYY-MM-dd"}
            onChange={(date) => {
              handleChange(name, {
                to: date[1]?.toISOString(),
                from: date[0]?.toISOString(),
              });
            }}
            value={watch(name)}
            disabled={
              typeof disabled === "boolean" ? disabled : disabled?.(watch())
            }
            required={
              typeof required === "boolean" ? required : required?.(watch())
            }
          />
        );
      }
      case "textarea": {
        const {
          hidden,
          disabled,
          required,
          readOnly,
          placeholder,
          autoFocus,
          defaultValue,
          ...rest
        } = field;
        return (
          <Textarea
            className="input w-full"
            {...register(field.name, {
              onChange: (event) => {
                handleChange(field.name, event.target.value);
              },
            })}
            defaultValue={
              typeof defaultValue === "string"
                ? defaultValue
                : defaultValue?.(watch())
            }
            placeholder={
              typeof placeholder === "string"
                ? placeholder
                : placeholder?.(watch())
            }
            hidden={typeof hidden === "boolean" ? hidden : hidden?.(watch())}
            disabled={
              typeof disabled === "boolean" ? disabled : disabled?.(watch())
            }
            required={
              typeof required === "boolean" ? required : required?.(watch())
            }
            autoFocus={
              typeof autoFocus === "boolean" ? autoFocus : autoFocus?.(watch())
            }
          />
        );
      }
      case "select": {
        const { disabled, required, placeholder } = field;
        return (
          <CustomSelect
            options={field.options!}
            initialValue={watch(field.name)}
            isMulti={field.multiple}
            onChange={(value) => handleChange(field.name, value)}
            placeholder={
              typeof placeholder === "string"
                ? placeholder
                : placeholder?.(watch())
            }
            isDisabled={
              typeof disabled === "boolean" ? disabled : disabled?.(watch())
            }
            required={
              typeof required === "boolean" ? required : required?.(watch())
            }
          />
        );
      }
      case "number": {
        const {
          min,
          max,
          step,
          disabled,
          hidden,
          required,
          readOnly,
          placeholder,
          defaultValue,
          ...rest
        } = field;
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
            placeholder={
              typeof placeholder === "string"
                ? placeholder
                : placeholder?.(watch())
            }
            min={typeof min === "number" ? min : min?.(watch())}
            max={typeof max === "number" ? max : max?.(watch())}
            step={typeof step === "number" ? step : step?.(watch())}
            disabled={
              typeof disabled === "boolean" ? disabled : disabled?.(watch())
            }
            hidden={typeof hidden === "boolean" ? hidden : hidden?.(watch())}
            required={
              typeof required === "boolean" ? required : required?.(watch())
            }
            readOnly={
              typeof readOnly === "boolean" ? readOnly : readOnly?.(watch())
            }
            defaultValue={
              typeof defaultValue === "number"
                ? defaultValue
                : defaultValue?.(watch())
            }
          />
        );
      }
      default: {
        const {
          hidden,
          disabled,
          required,
          readOnly,
          placeholder,
          min,
          max,
          step,
          ...rest
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
            placeholder={
              typeof placeholder === "string"
                ? placeholder
                : placeholder?.(watch())
            }
            min={typeof min === "number" ? min : min?.(watch())}
            max={typeof max === "number" ? max : max?.(watch())}
            step={typeof step === "number" ? step : step?.(watch())}
            disabled={
              typeof disabled === "boolean" ? disabled : disabled?.(watch())
            }
            hidden={typeof hidden === "boolean" ? hidden : hidden?.(watch())}
            required={
              typeof required === "boolean" ? required : required?.(watch())
            }
            readOnly={
              typeof readOnly === "boolean" ? readOnly : readOnly?.(watch())
            }
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
