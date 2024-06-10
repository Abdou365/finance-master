import bem from "bem-ts";
import { useItems } from "../../store.tsx/store.ctx";
import "./Header.scss";

const cx = bem("header");

export function Header() {
  const { save } = useItems();

  return (
    <div className={cx()}>
      <div className={cx("actions")}></div>
    </div>
  );
}
