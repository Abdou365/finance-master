import { Listbox } from "@headlessui/react";
import { formatOptions } from "../../utils/formatOptions";
import keyBy from "lodash/keyBy";
import { SelectHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { FaTimesCircle } from "react-icons/fa";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  state: string | string[];
  options:
    | {
        label: string;
        value: string;
      }[]
    | string[];
  onChange: (value: string | string[]) => void;
}

export const Select: React.FC<SelectProps> = (props) => {
  const { state, options, onChange } = props;
  const formatedOptions = formatOptions(options);
  const optionByKey = keyBy(options, "value");

  if (props.multiple) {
    const formattedState = Array.isArray(state) ? state : [state];
    return (
      <div className="relative">
        <Listbox>
          <Listbox.Button
            className={twMerge("max-w-full flex gap-2 ", props.className)}
          >
            {formattedState?.map((s) => {
              return (
                <div className="bg-gray-100 p-1 rounded text-sm w-fit flex items-baseline gap-1 ">
                  {optionByKey[s]?.label}
                  <FaTimesCircle
                    className=" m-auto hover:fill-red-500"
                    onClick={(e) => {
                      e.preventDefault();
                      const neValue = formattedState?.filter((st) => st !== s);
                      onChange(neValue);
                    }}
                  />
                </div>
              );
            })}
          </Listbox.Button>

          <Listbox.Options className="border absolute w-full  bg-white z-10 cursor-pointer rounded shadow">
            {formatedOptions.map((option) => {
              const isAlreadySelected = formattedState.includes(option.value);
              return (
                <Listbox.Option
                  className={twMerge(
                    "py-1 px-2 hover:bg-slate-100 active:bg-primary-100 w-full",
                    isAlreadySelected && "bg-primary-100"
                  )}
                  key={option?.label}
                  value={option?.value}
                  onClick={() => {
                    if (isAlreadySelected) {
                      const neValue = formattedState?.filter(
                        (st) => st !== option.value
                      );
                      onChange(neValue);
                    } else {
                      onChange([...formattedState, option.value]);
                    }
                  }}
                >
                  {option?.label}
                </Listbox.Option>
              );
            })}
          </Listbox.Options>
        </Listbox>
      </div>
    );
  }

  const stringState = Array.isArray(state) ? state[0] : state;

  return (
    <Listbox>
      <Listbox.Button className={twMerge("max-w-full", props.className)}>
        {optionByKey[stringState]?.label || stringState || props.defaultValue}
      </Listbox.Button>

      <Listbox.Options className="border absolute  bg-white z-10 cursor-pointer rounded shadow">
        {formatedOptions.map((option) => {
          return (
            <Listbox.Option
              className="py-1 px-2 hover:bg-slate-100 active:bg-primary-100 w-full"
              key={option?.label}
              value={option?.value}
              onClick={() => onChange(option.value)}
            >
              {option?.label}
            </Listbox.Option>
          );
        })}
      </Listbox.Options>
    </Listbox>
  );
};
