// import React from "react";

// const ColorRadioGroup = () => {
//   const colors = [
//     { bg: "bg-[#2563EB]", ring: "ring-[#2563EB]" },
//     { bg: "bg-[#8B5CF6]", ring: "ring-[#8B5CF6]" },
//     { bg: "bg-[#DB2777]", ring: "ring-[#DB2777]" },
//     { bg: "bg-[#475569]", ring: "ring-[#475569]" },
//     { bg: "bg-[#EA580C]", ring: "ring-[#EA580C]" },
//   ];

//   return (
//     <div>
//       <ul className="flex items-center flex-wrap gap-4">
//         {colors.map((item, idx) => (
//           /* Color box */
//           <li key={idx} className="flex-none">
//             <label htmlFor={item.bg} className="block relative w-8 h-8">
//               <input
//                 id={item.bg}
//                 type="radio"
//                 defaultChecked={idx == 1 ? true : false}
//                 name="color"
//                 class="sr-only peer"
//               />
//               <span
//                 className={`peer-hover:ring inline-flex justify-center items-center w-full h-full rounded-full peer-checked:ring ring-offset-0 cursor-pointer duration-150 ${item.bg} ring-theme-primary`}
//               ></span>
//             </label>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ColorRadioGroup;

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
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ColorRadioGroup;
