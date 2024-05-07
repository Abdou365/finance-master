import { Header } from "../Header/Header";
import Items from "../Items/Items";

const Activity = () => {
  return (
    <section className="container m-auto flex-1 overflow-hidden flex flex-col gap-2">
      <Header />
      <Items />
    </section>
  );
};

export default Activity;
