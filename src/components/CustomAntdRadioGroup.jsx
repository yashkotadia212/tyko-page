import React, { useState, useEffect, useRef } from "react";
import { Radio } from "antd";

const CustomAntdRadioGroup = ({ radioOptions, onChange, initialValue }) => {
  const [selectedValue, setSelectedValue] = useState(
    initialValue || radioOptions[0].value
  );
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleOnChange = (e) => {
    const val = e.target.value;
    setSelectedValue(val);
    if (onChange) {
      onChange(val);
    }
    // scrollToNextElement(e.target);
  };

  // Trigger onChange on initial render
  useEffect(() => {
    if (onChange) {
      onChange(selectedValue);
    }
  }, [initialValue, radioOptions, onChange, selectedValue]);

  const containerWidth = Math.round(window.innerWidth * 0.18);

  // Handle mouse wheel scrolling
  useEffect(() => {
    const container = containerRef.current;
    const handleWheelScroll = (e) => {
      e.preventDefault();
      container.scrollLeft += e.deltaY;
    };

    container.addEventListener("wheel", handleWheelScroll);

    return () => {
      container.removeEventListener("wheel", handleWheelScroll);
    };
  }, []);

  // Scroll to the next button if clicked near the container's end
  const scrollToNextElement = (target) => {
    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    const isElementPartiallyVisible =
      targetRect.left < containerRect.left ||
      targetRect.right > containerRect.right;

    if (isElementPartiallyVisible) {
      const scrollAmount = targetRect.right - containerRect.right;
      container.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Handle drag-to-scroll functionality
  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeft.current = containerRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 2; // The 2 is a multiplier to make the drag faster
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDragging.current = false;
  };

  return (
    <div
      ref={containerRef}
      style={{
        maxWidth: `${containerWidth}px`,
        userSelect: "none", // Disable text selection for the entire container
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
      }}
      className="flex gap-2 overflow-x-auto scrollbar-hidden w-full"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUpOrLeave}
      onMouseLeave={handleMouseUpOrLeave}
    >
      <Radio.Group
        value={selectedValue}
        onChange={handleOnChange}
        className="flex gap-2"
      >
        {radioOptions.map((option) => (
          <CustomStyleRadioButton
            key={option.value}
            value={option.value}
            icon={option.icon}
            text={option.text}
          />
        ))}
      </Radio.Group>
    </div>
  );
};

const CustomStyleRadioButton = ({ value, icon, text }) => (
  <Radio.Button
    value={value}
    className="flex flex-col items-center justify-center w-[70px] h-[55px] bg-gray-100"
  >
    <div className="w-full flex justify-center text-xl pt-3">{icon}</div>
    <div className="-mt-1">{text}</div>
  </Radio.Button>
);

export default CustomAntdRadioGroup;
