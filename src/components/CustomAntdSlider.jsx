import React, { useState, useEffect } from "react";
import { Slider } from "antd";

const CustomAntdSlider = ({ min, max, step, initialValue, onChange, dots }) => {
  const [value, setValue] = useState(initialValue || min || 0);

  const handleSliderChange = (newValue) => {
    setValue(newValue); // Update the value state
    if (onChange) {
      onChange(newValue); // Call the onChange callback with the new value
    }
  };

  // Trigger onChange on initial render
  useEffect(() => {
    if (onChange) {
      onChange(value); // Call onChange with the current value (initialValue or min)
    }
  }, [initialValue, min, onChange, value]);

  return (
    <Slider
      className="w-full"
      min={min || 0}
      max={max || 100}
      step={step || 1}
      value={value}
      onChange={handleSliderChange} // Handle slider change
      dots={dots || false} // Display dots
    />
  );
};

export default CustomAntdSlider;
