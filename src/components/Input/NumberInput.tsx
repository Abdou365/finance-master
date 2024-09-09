import { InputHTMLAttributes, useState } from "react";
import { twJoin } from "tailwind-merge";
import "./NumberInput.scss";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const NumberInput = (props: Props) => {
  const { className, onInput, style, ...otherProps } = props;
  const [enteredValue, setEnteredValue] = useState(
    props.value || props.defaultValue || ""
  );

  console.log(enteredValue.toString().length);

  return (
    <input
      type="number"
      inputMode="numeric"
      pattern="[0-9]*"
      autoComplete="cc-number"
      autoCorrect="on"
      style={{ width: `${enteredValue.toString().length}ch`, ...style }}
      className={twJoin(className, "lk-input-number")}
      onInput={(e) => {
        const value = e.currentTarget.value;
        setEnteredValue(value);
        if (onInput) {
          onInput(e);
        }
      }}
      {...otherProps}
    />
  );
};

export default NumberInput;
