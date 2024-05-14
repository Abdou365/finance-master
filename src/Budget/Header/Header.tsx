import bem from "bem-ts";
import { useItems } from "../../store.tsx/store.ctx";
import "./Header.scss";

const cx = bem("header");

export function Header() {
  const { save } = useItems();

  return (
    <div className={cx()}>
      {/* <ul className={cx("navigation")}>
        <li>
          <Link to={"/"}>Dashboard</Link>
        </li>
        <li>
          <Link to={"/activity"}>Ativité</Link>
        </li>
      </ul> */}

      <div className={cx("actions")}>
        {/* <ReactDatePicker
          placeholderText="Select the date"
          onChange={(e) => console.log(e)}
          selectsRange
          className=" border p-2 rounded"
          calendarClassName=" bg-primary-50 text-primary-800"
          showIcon
        /> */}
      </div>
    </div>
  );
}
