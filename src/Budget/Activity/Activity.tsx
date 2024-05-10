import { useParams } from "react-router-dom";
import { Header } from "../Header/Header";
import Items from "../Items/Items";
import ItemsProvider from "../../store.tsx/ItemsProvider";

const Activity = () => {
  const { accountId } = useParams();

  console.log(accountId);

  return (
    <section className=" w-full bg-gray-100 m-auto flex-1 overflow-hidden flex flex-col gap-2 xl:px-32 sm:px-10 xs:px-5">
      <ItemsProvider>
        <Header />
        <Items />
      </ItemsProvider>
    </section>
  );
};

export default Activity;
