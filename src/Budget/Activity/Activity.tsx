import ItemsProvider from "../../store.tsx/ItemsProvider";
import { Header } from "../Header/Header";
import Items from "../Items/Items";

const Activity = () => {
  return (
    <section className=" w-full m-auto flex-1 overflow-hidden flex flex-col gap-2 xl:px-32 sm:px-10 xs:px-5">
      <ItemsProvider>
        <Header />
        <Items />
      </ItemsProvider>
    </section>
  );
};

export default Activity;
