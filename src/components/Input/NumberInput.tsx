import React, { InputHTMLAttributes, useState } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const NumberInput = (props: Props) => {
  const [value, setValue] = useState(props.value || props.defaultValue || "");
  console.log(value);

  return (
    <input
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      autoComplete="cc-number"
      autoCorrect="on"
      name="value"
      min={0}
      onInput={(e) => {
        setValue(e.currentTarget.value);
        props.onInput(e);
      }}
      className={twMerge(
        props.className,
        "text-right",
        Number(value) >= 10 && "w-4",
        Number(value) >= 100 && "w-6",
        Number(value) >= 1000 && "w-8",
        Number(value) >= 10000 && "w-10"
      )}
      {...props}
    />
  );
};

export default NumberInput;
