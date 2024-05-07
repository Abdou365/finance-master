import { FaArrowRight } from "react-icons/fa";
import { useAccount } from "./useAccount";

type Props = {};

const Account = (props: Props) => {
  const { data } = useAccount();

  console.log({ data });

  return (
    <main className="flex h-screen p-5 bg-gray-50 bg-gradient-to-tr ">
      <div className="container m-auto grid lg:grid-cols-3 sm:grid-cols-1 gap-3 align-top justify-start place-content-start">
        <div className="rounded-xl relative  shadow p-5 overflow-hidden">
          <div className="absolute h-full w-full bg-white top-0 left-0 blur-2xl">
            <div className="h-24 w-24 ml-auto bg-green-300"></div>
          </div>
          <div className="relative h-full w-full   space-y-3">
            <div className="flex justify-between w-full">
              <div className="flex flex-col">
                <span className=" uppercase font-bold">solde </span>
                <span className=" text-2xl font-bold">55 €</span>
              </div>
              <div className=" text-right">
                <svg
                  className=" w-full h-48 fill-green-500"
                  width="800px"
                  height="800px"
                  viewBox="0 0 32 32"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="icomoon-ignore"></g>
                  <path d="M27.995 1.073c-1.47 0-2.666 1.195-2.666 2.665 0 0.926 0.476 1.742 1.195 2.22l-5.040 13.284c-0.14-0.023-0.28-0.043-0.425-0.043-0.639 0-1.218 0.235-1.677 0.611l-5.043-4.166c0.199-0.373 0.322-0.792 0.322-1.244 0-1.47-1.196-2.666-2.666-2.666s-2.666 1.196-2.666 2.666c0 0.794 0.356 1.501 0.909 1.989l-5.374 9.36c-0.271-0.093-0.556-0.155-0.859-0.155-1.47 0-2.666 1.195-2.666 2.665 0 1.471 1.196 2.667 2.666 2.667s2.665-1.196 2.665-2.667c0-0.784-0.346-1.482-0.887-1.97l5.38-9.37c0.263 0.087 0.539 0.146 0.831 0.146 0.633 0 1.206-0.231 1.664-0.6l5.049 4.17c-0.194 0.37-0.314 0.783-0.314 1.228 0 1.47 1.196 2.666 2.666 2.666s2.666-1.196 2.666-2.666c0-0.946-0.499-1.773-1.243-2.247l5.032-13.263c0.157 0.029 0.317 0.048 0.482 0.048 1.47 0 2.666-1.196 2.666-2.667s-1.196-2.665-2.666-2.665zM4.005 29.861c-0.882 0-1.6-0.718-1.6-1.601 0-0.881 0.718-1.598 1.6-1.598s1.599 0.717 1.599 1.598c0 0.883-0.717 1.601-1.599 1.601zM11.995 16c-0.882 0-1.599-0.717-1.599-1.599s0.717-1.599 1.599-1.599 1.599 0.717 1.599 1.599-0.717 1.599-1.599 1.599zM21.059 23.464c-0.882 0-1.599-0.717-1.599-1.599s0.717-1.599 1.599-1.599 1.599 0.717 1.599 1.599c0 0.882-0.717 1.599-1.599 1.599zM27.995 5.338c-0.882 0-1.599-0.718-1.599-1.6 0-0.881 0.717-1.598 1.599-1.598s1.599 0.717 1.599 1.598c0 0.883-0.717 1.6-1.599 1.6z"></path>
                </svg>
                <span className="ml-auto text-green-500 text-xl font-bold">
                  + 30%
                </span>
              </div>
            </div>
            <h3 className=" font-bold text-gray-800 text-xl">Le Titre mon</h3>
            <p className=" text-gray-600 text-sm line-clamp-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores,
              quis! Vero veniam neque possimus earum suscipit, doloremque,
              facilis eum quisquam doloribus ea corrupti fugiat nam ad, minus
              incidunt ipsa. Eveniet.
            </p>
            <div className="w-full h-2 bg-green-200 rounded-full">
              <div className="w-2/3 h-full text-center text-xs text-white bg-green-600 rounded-full"></div>
            </div>
            <button className="btn-primary-link flex align-middle gap-2">
              <span className="m-auto">Modifier</span>
              <FaArrowRight className=" m-auto" size={12} />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Account;
