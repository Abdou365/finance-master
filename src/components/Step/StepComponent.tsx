import React from "react";
import { FaCheck } from "react-icons/fa";
import { twJoin, twMerge } from "tailwind-merge";

type Props = {
  items: { label: string }[];
  onStepChange: (step: number) => void;
  activeStep: number;
  clickable?: boolean;
};

const StepperComponent: React.FC<Props> = (props) => {
  const { items, onStepChange, activeStep, clickable } = props;

  return (
    <div className="w-full items">
      <div className="flex w-full items-center px-3">
        {items.map(({ label }, index) => {
          const isCompleted = activeStep > index;
          return (
            <>
              <div className=" p-4">
                <div
                  className={twMerge(
                    `size-8 rounded-full relative flex place-content-center  place-items-center text-center font-bold ${
                      isCompleted
                        ? "bg-primary-500 "
                        : activeStep === index
                        ? "bg-primary-500 ring dark:ring-primary-800 ring-primary-200 ring-offset-2 dark:ring-offset-primary-900 "
                        : "bg-gray-100 dark:bg-primary-900"
                    }`
                  )}
                  onClick={() => {
                    if (clickable) {
                      onStepChange(index);
                    }
                  }}
                >
                  <span
                    className={twMerge(
                      ` ${
                        isCompleted
                          ? "text-white"
                          : activeStep === index
                          ? "text-white"
                          : "text-gray-400 dark:text-primary-400"
                      }`
                    )}
                  >
                    {isCompleted ? <FaCheck /> : index + 1}
                  </span>
                  <span className="absolute -top-7 text-sm">{label}</span>
                </div>
              </div>
              {items.length - 1 > index && (
                <div
                  className={twJoin(
                    `flex-1 h-0.5 
                             
                    
                     ${
                       isCompleted
                         ? "dark:bg-primary-500 bg-primary-500"
                         : activeStep > index
                         ? "dark:bg-primary-500 bg-primary-500"
                         : "bg-gray-200 dark:bg-primary-800"
                     }`
                  )}
                ></div>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default StepperComponent;
