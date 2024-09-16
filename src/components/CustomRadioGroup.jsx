import React, { useEffect, useState } from "react";

const CustomRadioGroup = ({
  radioOptions,
  childMaxWidth = 6,
  onChange,
  initialValue,
}) => {
  // const [selectedIndex, setSelectedIndex] = useState(0);
  // Initialize state with the index of the initialValue
  const [selectedIndex, setSelectedIndex] = useState(() => {
    const initialIndex = radioOptions.findIndex(
      (option) => option.value === initialValue
    );
    return initialIndex >= 0 ? initialIndex : 0; // Default to the first option if initialValue is not found
  });

  // Determine the number of columns dynamically based on the length of radioOptions
  const columns = (() => {
    switch (radioOptions.length) {
      case 2:
        return "grid-cols-2"; // For 2 options
      case 3:
        return "grid-cols-3"; // For 3 options
      case 4:
        return "grid-cols-4"; // For 4 options
      case 5:
        return "grid-cols-5"; // For 5 options
      default:
        return `grid-cols-${Math.min(radioOptions.length, 6)}`; // For more than 5 options, limit to 6 columns
    }
  })();

  const handleChange = (index) => {
    setSelectedIndex(index);
    if (onChange) {
      onChange(radioOptions[index].value); // Call onChange with the selected value
    }
  };

  useEffect(() => {
    if (onChange) {
      onChange(radioOptions[selectedIndex].value); // Call onChange with the default value
    }
  }, []); // Call only once on initial render

  return (
    <main className="grid w-full place-items-start">
      <div
        className={`relative grid ${columns} gap-2 rounded-full bg-gray-100`}
        style={{ width: `${radioOptions.length * childMaxWidth}rem` }} // Dynamically set the width
      >
        {radioOptions.map((option, index) => (
          <div key={option.value}>
            <input
              type="radio"
              name="option"
              id={option.value}
              value={option.value}
              className="peer hidden"
              checked={selectedIndex === index} // Control the checked state
              onChange={() => handleChange(index)} // Update the selected index and call onChange
            />
            <label
              htmlFor={option.value}
              className="w-auto block cursor-pointer select-none rounded-full p-2 text-center border-2 border-transparent peer-checked:invisible peer-checked:border-gray-400 peer-checked:bg-white peer-checked:text-theme-primary text-xs hover:text-theme-primary font-semibold"
            >
              {option.label}
            </label>
          </div>
        ))}
        <div
          className="absolute bottom-0 left-0 h-full transition-transform duration-300 ease-in-out bg-white border-2 border-gray-300 rounded-full flex justify-center items-center"
          style={{
            width: `calc(${childMaxWidth}rem - 0.5rem)`, // Adjust width for border
            transform: `translateX(${
              selectedIndex * childMaxWidth + selectedIndex * 0.15
            }rem)`, // Slide indicator
          }}
        />
        <div
          style={{
            width: `${childMaxWidth}rem`,
            transform: `translateX(${
              selectedIndex * childMaxWidth + selectedIndex * 0.15
            }rem)`,
          }}
          className="text-xs font-semibold text-theme-primary absolute bottom-0 left-0 h-full transition-transform duration-300 ease-in-out bg-white border-2 border-gray-300 rounded-full flex justify-center items-center"
        >
          {radioOptions[selectedIndex].label}
        </div>
      </div>
    </main>
  );
};

export default CustomRadioGroup;
