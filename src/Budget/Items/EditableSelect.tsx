import React, { useState } from "react";

interface Props extends React.HTMLProps<HTMLSelectElement> {
  options: { value: string; label: string }[];
  creatable?: boolean;
  searchable?: boolean;
  onCreateOption?: (label: string) => void;
}

const SelectInput: React.FC<Props> = (props) => {
  const { options, creatable, searchable, onCreateOption, onChange, ...rest } =
    props;
  const [selectedValue, setSelectedValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectOptions, setOptions] = useState([...options]);

  const filteredOptions = selectOptions.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    if (onChange) {
      onChange(event);
    }
  };

  const handleCreateOption = (label: string) => {
    const newOption = { value: label.replace(/\s+/g, ""), label };
    setOptions([...selectOptions, newOption]);
    setSelectedValue(newOption.value);
    setSearchTerm("");
    if (onCreateOption) {
      onCreateOption(label);
    }
    if (onChange) {
      onChange({ target: { value: newOption.value } });
    }
  };

  return (
    <>
      <input
        type="text"
        className="w-full bg-transparent outline-none"
        value={searchTerm}
        onChange={(e) => searchable && setSearchTerm(e.target.value)}
        onKeyDown={(e) => {
          if (creatable && e.key === "Enter" && searchTerm) {
            handleCreateOption(searchTerm);
          }
        }}
        placeholder="Type to search or create..."
        list="options"
        {...rest}
      />

      <datalist id="options">
        {filteredOptions.map((option) => (
          <option key={option.value} value={option.label} />
        ))}
      </datalist>
    </>
  );
};

export default SelectInput;
