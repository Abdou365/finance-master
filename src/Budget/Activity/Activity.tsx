import ItemsProvider from "../../store.tsx/ItemsProvider";
import { Header } from "../Header/Header";
import Items from "../Items/Items";

const Activity = () => {
  return (
    <section className=" w-full m-auto flex-1 overflow-hidden flex flex-col gap-2">
      <ItemsProvider>
        <Header />
        <Items />
      </ItemsProvider>
    </section>
  );
};

export default Activity;
