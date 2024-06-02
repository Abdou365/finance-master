import React, { useState } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import {
  compactSelectStyles,
  defaultSelectStyles,
} from "../../components/Form/selectClassNames";
import { formatOptions } from "../../utils/formatOptions";
import { TableColumnType } from "./ItemsTable";

type Props = {
  initialValue: string;
  onChange: (value: unknown | unknown[]) => void;
  options: TableColumnType["options"];
  creatable?: boolean;
  compact?: boolean;
  isMulti?: boolean;
};

const createOption = (label: string) => ({
  label,
  value: label,
});

interface Option {
  readonly label: string;
  readonly value: string | number;
}

function computeInitialValue(props: Props, options: Option[]) {
  if (props.isMulti) {
    const val = options?.filter((option) =>
      props.initialValue?.includes(option.value.toString())
    );
    console.log({ val });

    return val;
  }
  return (
    options?.find((option) => option.value === props.initialValue) || {
      label: props.initialValue,
      value: props.initialValue,
    }
  );
}

const CustomSelect: React.FC<Props> = (props) => {
  const { compact } = props;
  const [options, setOptions] = useState(formatOptions(props.options || []));
  const [value, setValue] = useState<Option | Option[] | null>(
    computeInitialValue(props, options)
  );
  const [isLoading, setIsLoading] = useState(false);

  const SelectComponent = props.creatable ? CreatableSelect : Select;

  const handleCreate = async (inputValue: string) => {
    setIsLoading(true);
    const newValue = await new Promise<Option>((resolve) =>
      setTimeout(() => {
        const newOption = createOption(inputValue);
        setOptions([...options, newOption]);
        setValue(newOption);
        setIsLoading(false);
        resolve(newOption);
      }, 1000)
    );

    if (!isLoading) props.onChange(newValue.value);
  };

  return (
    <SelectComponent
      defaultValue={value}
      unstyled
      styles={{
        control: (styles) => ({
          ...styles,
          minHeight: compact ? "1.5rem" : undefined,
        }),
      }}
      onCreateOption={handleCreate}
      classNames={compact ? compactSelectStyles : defaultSelectStyles}
      isDisabled={isLoading}
      isLoading={isLoading}
      options={options}
      value={value}
      isMulti={props.isMulti}
      onChange={(newValue) => {
        setValue(newValue);
        if (props.isMulti) {
          props.onChange(newValue.map((option: Option) => option.value));
        } else {
          console.log(newValue.value);

          props.onChange(newValue.value);
        }
      }}
      isSearchable={props.creatable || false}
      isClearable
    />
  );
};

export default CustomSelect;
