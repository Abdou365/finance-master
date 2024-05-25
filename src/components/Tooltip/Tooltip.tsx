import { Placement, VirtualElement } from "@popperjs/core";
import { ReactNode, useState, useRef, useEffect } from "react";
import { usePopper } from "react-popper";
import "./Tooltip.scss";

type Props = {
  direction?: Placement;
  children: ReactNode;
  trigger: ReactNode;
  mode?: "hover" | "click";
  keepOpen?: boolean;
  size?: "small" | "medium" | "large";
  closeOnClick?: boolean;
  as?: "Proppup" | "Tooltip";
};

const Tooltip: React.FC<Props> = ({
  direction = "right",
  children,
  trigger,
  mode = "click",
  size = "medium",
  closeOnClick,
  keepOpen = false,
  as = "Tooltip",
}) => {
  const [referenceElement, setReferenceElement] = useState<
    Element | VirtualElement | null | undefined
  >(null);
  const [popperElement, setPopperElement] = useState<
    HTMLElement | null | undefined
  >(null);
  const [arrowElement, setArrowElement] = useState(null);
  const [visible, setVisible] = useState(false);
  const popperRef = useRef<boolean | null>(null);
  popperRef.current = visible;

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [
      {
        name: "arrow",
        options: {
          element: arrowElement,
          padding: {
            popper: popperElement,
            reference: referenceElement,
            placement: direction,
          },
        },
      },
      { name: "preventOverflow" },
      { name: "flip", options: { fallbackPlacements: ["top", "bottom"] } },
      { name: "offset", options: { offset: [0, 10] } },
    ],
    placement: direction,
    strategy: "fixed",
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popperRef.current && !popperElement.contains(event.target)) {
        setVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popperElement]);

  const handleTrigger = () => {
    if (mode === "click") {
      setVisible(!visible);
    }
    if (mode === "click" && closeOnClick) {
      setVisible(false);
    }
  };

  const handleMouseOver = () => {
    if (mode === "hover") {
      setVisible(true);
    }
  };

  const handleMouseOut = () => {
    if (mode === "hover" && !keepOpen) {
      setVisible(false);
    }
  };

  console.log(attributes);

  return (
    <>
      <div
        ref={setReferenceElement}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onClick={handleTrigger}
      >
        {trigger}
      </div>
      {visible && (
        <>
          <div
            className="tooltip"
            ref={setPopperElement}
            style={{
              ...styles.popper,
            }}
            {...attributes.popper}
          >
            <div className="tooltip-content">{children}</div>
            <div
              className="tooltip-arrow"
              ref={setArrowElement}
              {...attributes.arrow}
              style={{
                ...styles.arrow,
              }}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Tooltip;
