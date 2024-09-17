import React, { useState, useEffect } from "react";

const ColorRadioGroup = ({ colorRadioOptions, onChange, initialValue }) => {
  // State to manage the selected color
  const [selectedColor, setSelectedColor] = useState(
    initialValue || colorRadioOptions[0].value
  );

  // Handle color change
  const handleColorChange = (value) => {
    setSelectedColor(value);
    if (onChange) {
      onChange(value);
    }
  };

  // Set the initial value if provided
  useEffect(() => {
    if (initialValue) {
      setSelectedColor(initialValue);
    }
  }, [initialValue]);

  // Trigger onChange for the initial value if nothing is selected
  useEffect(() => {
    if (onChange) {
      onChange(selectedColor);
    }
  }, []);

  return (
    <div>
      <ul className="flex items-center flex-wrap gap-4">
        {colorRadioOptions.map((item, idx) => (
          /* Color box */
          <li key={idx} className="flex-none">
            <label htmlFor={item.value} className="block relative w-6 h-6">
              <input
                id={item.value}
                type="radio"
                checked={selectedColor === item.value}
                onChange={() => handleColorChange(item.value)}
                name="color"
                className="sr-only peer"
              />
              <span
                className={`peer-hover:ring-2 inline-flex justify-center items-center w-full h-full rounded-full peer-checked:ring-2 ring-offset-0 ring-theme-primary cursor-pointer duration-150`}
                style={{ backgroundColor: item.value }}
              ></span>

              <div className="absolute -top-[165px] opacity-0 -left-[60px] invisible peer-hover:visible peer-hover:-top-[155px] peer-hover:opacity-100 transition-all duration-300">
                <div
                  style={{ backgroundColor: item.value }}
                  className="w-36 h-36 rounded-full flex justify-center items-end overflow-hidden"
                >
                  <div className="bg-gray-100 w-full h-10 flex justify-center items-center">
                    {item.color}
                  </div>
                </div>
              </div>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ColorRadioGroup;
