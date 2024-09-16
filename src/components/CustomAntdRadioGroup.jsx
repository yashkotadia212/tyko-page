import React, { useState, useEffect } from "react";
import { Radio } from "antd";

const CustomAntdRadioGroup = ({ radioOptions, onChange, initialValue }) => {
  // State to manage the selected value
  const [selectedValue, setSelectedValue] = useState(
    initialValue || radioOptions[0].value
  );
  const handleOnChange = (e) => {
    const val = e.target.value;
    setSelectedValue(val);
    if (onChange) {
      onChange(val);
    }
  };

  // Trigger onChange on initial render
  useEffect(() => {
    if (onChange) {
      onChange(selectedValue);
    }
  }, [initialValue, radioOptions, onChange, selectedValue]);

  return (
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
