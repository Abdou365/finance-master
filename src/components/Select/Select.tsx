import { Listbox } from "@headlessui/react";
import { formatOptions } from "../../utils/formatOptions";
import keyBy from "lodash/keyBy";

type SelectProps = {
  state: string;
  options:
    | {
        name: string;
        value: string;
      }[]
    | string[];
  onChange: (
    value:
      | {
          name: string;
          value: string;
        }
      | string
  ) => void;
};

export const Select: React.FC<SelectProps> = ({ state, options, onChange }) => {
  const formatedOptions = formatOptions(options);
  const optionByKey = keyBy(options, "value");
  return (
    <Listbox>
      <Listbox.Button className="max-w-full">
        {optionByKey[state]?.name || state}
      </Listbox.Button>

      <Listbox.Options className="border absolute  bg-white z-10 cursor-pointer rounded shadow">
        {formatedOptions.map((option) => {
          return (
            <Listbox.Option
              className="py-1 px-2 hover:bg-slate-100 active:bg-primary-100 w-full"
              key={option?.name}
              value={option?.value}
              onClick={() => onChange(option)}
            >
              {option?.name}
            </Listbox.Option>
          );
        })}
      </Listbox.Options>
    </Listbox>
  );
};
