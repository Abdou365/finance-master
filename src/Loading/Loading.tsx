import { createContext, ReactNode, useContext, useState } from "react";
import Loader from "../components/Loader/Loader";

const LoadingCtx = createContext({
  isLoading: false,
  setIsLoading: (_loading: boolean) => {},
});

export const useLoading = () => useContext(LoadingCtx);

const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <LoadingCtx.Provider value={{ isLoading, setIsLoading }}>
      {children}
      {isLoading && (
        <div className="w-full h-full bg-primary-950 opacity-80 absolute z-50 place-content-center">
          <div className=" m-auto w-fit flex flex-col items-center gap-2">
            <Loader />
            <div className="text-primary-400 font-semibold text-lg">
              Loading...
            </div>
          </div>
        </div>
      )}
    </LoadingCtx.Provider>
  );
};

export default LoadingProvider;
