import { useEffect, useRef, useState } from "react";
import "./Tooltip.scss";

type Props = {
  direction: "top" | "right" | "bottom" | "left";
  content: string;
  trigger: string;
  mode?: "hover" | "click";
  keepOpen?: boolean;
  size?: "small" | "medium" | "large";
};

const Tooltip = ({
  direction,
  content,
  trigger,
  mode = "click",
  size = "medium",
  keepOpen = false,
}: Props) => {
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState(direction);
  const tooltipRef = useRef(null);

  useEffect(() => {
    function updatePosition() {
      if (show && tooltipRef.current) {
        const rect = (
          tooltipRef.current as HTMLElement
        ).getBoundingClientRect();

        if (rect.right > window.innerWidth) {
          setPosition("left");
        } else if (rect.left < 0) {
          setPosition("right");
        }

        if (rect.bottom > window.innerHeight) {
          setPosition("top");
        } else if (rect.top < 0) {
          setPosition("bottom");
        }
      }
    }

    updatePosition();
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("resize", updatePosition);
    };
  }, [show]);

  return (
    <div
      className={`tooltip tooltip-${position} tooltip-${size}`}
      onMouseEnter={() => mode === "hover" && setShow(true)}
      onMouseLeave={() => mode === "hover" && !keepOpen && setShow(false)}
      onClick={() => setShow(!show)}
    >
      {trigger}
      {show && (
        <div ref={tooltipRef} className="tooltip-content">
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
