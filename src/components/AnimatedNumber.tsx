import React, { useEffect, useState } from "react";
import { intelligentRound } from "../utils/rounding";

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  delay?: number;
  className?: string;
  withSign?: boolean;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  duration = 200,
  delay = 0,
  className,
  withSign = false,
}) => {
  const [displayValue, setDisplayValue] = useState<number>(0);

  useEffect(() => {
    const startAnimation = () => {
      let startValue = 0;
      const increment = (value - startValue) / (duration / 10);

      const timer = setInterval(() => {
        startValue += increment;
        if (startValue >= value) {
          clearInterval(timer);
          startValue = value;
        }
        setDisplayValue(intelligentRound(startValue, "standard", 1, 2));
      }, 10);

      return () => clearInterval(timer);
    };

    const delayTimer = setTimeout(startAnimation, delay);

    return () => clearTimeout(delayTimer);
  }, [value, duration, delay]);

  return (
    <div className={className}>
      {displayValue}
      {withSign && "€"}
    </div>
  );
};

export default AnimatedNumber;
