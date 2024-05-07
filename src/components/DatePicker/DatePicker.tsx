import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";
import "./DatePicker.scss";
const DatePicker = (props: ReactDatePickerProps) => {
  return <ReactDatePicker {...props} />;
};

export default DatePicker;
