import React, { cloneElement, useState } from "react";

//icons
import { BiDoorOpen } from "react-icons/bi";
import { PiRuler } from "react-icons/pi";
import { TbLamp } from "react-icons/tb";
import { PiWallLight } from "react-icons/pi";
import { AiOutlineUpload } from "react-icons/ai";
import CustomButton from "./CustomButton";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { BiHeart } from "react-icons/bi";
import CustomRadioGroup from "./CustomRadioGroup";
import { Tooltip } from "antd";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi2";
//style icons
import { PiGradientFill } from "react-icons/pi";
import { PiGridNine } from "react-icons/pi";
import ColorRadioGroup from "./ColorRadioGroup";
import CustomAntdSlider from "./CustomAntdSlider";
import CustomAntdRadioGroup from "./CustomAntdRadioGroup.jsx";

//valtio imports
import { useSnapshot } from "valtio";
import {
  configuratorStore,
  setConfiguratorAttribute,
} from "../valtio/configuratorStore.js";

const modelButtonsData = [
  {
    icons: <BiDoorOpen className="text-2xl" />,
    text: "Open all doors and drawers",
  },
  {
    icons: <PiRuler className="text-2xl" />,
    text: "Show Dimensions",
  },
  {
    icons: <TbLamp className="text-2xl" />,
    text: "Hide Items",
  },
  {
    icons: <PiWallLight className="text-2xl" />,
    text: "See product details",
  },
  {
    icons: <AiOutlineUpload className="text-2xl" />,
    text: "Share",
  },
];

const depthRadioOptions = [
  { value: "24", label: "24cm" },
  { value: "32", label: "32cm" },
  { value: "40", label: "40cm" },
  { value: "50", label: "50cm" },
];

const feetOptions = [
  { value: "standard", label: "Standard" },
  { value: "plinth", label: "Plinth" },
];

const backPanelOptions = [
  { value: "off", label: "OFF" },
  { value: "on", label: "ON" },
];

const finishOptions = [
  { value: "plywood", label: "Plywood" },
  { value: "veener", label: "Veener" },
];

const onChange = (value, key) => {
  setConfiguratorAttribute(key, value);
  // console.log(value, key);
};

const styleRadioOptions = [
  { value: "gradient", icon: <PiGradientFill />, text: "Gradient" },
  { value: "grid", icon: <PiGridNine />, text: "Grid" },
  { value: "mosaic", icon: <PiGridNine />, text: "Mosaic" },
  { value: "frame", icon: <PiGridNine />, text: "Frame" },
  { value: "pattern", icon: <PiGridNine />, text: "Pattern" },
  { value: "pixel", icon: <PiGridNine />, text: "Pixel" },
  // Add more options as needed
];

const colorRadioOptions = [
  { value: "#d9dad9", color: "Graystone" },
  { value: "#e3856b", color: "Tangerine" },
  { value: "#e3ccb2", color: "Beige" },
];

const selectorConfigsStatic = [
  {
    title: "Style",
    valtioKey: "style",
    component: (
      <CustomAntdRadioGroup
        radioOptions={styleRadioOptions}
        onChange={(val) => onChange(val, "style")} // Callback function
        initialValue={styleRadioOptions[0].value}
      />
    ),
  },
  {
    title: "Width",
    valtioKey: "width",
    component: (
      <CustomAntdSlider
        min={30} // Minimum value
        max={450} // Maximum value
        step={4} // Step value
        onChange={(val) => onChange(val, "width")} // Callback function
      />
    ),
  },
  {
    title: "Height",
    valtioKey: "height",
    component: (
      <CustomAntdSlider
        dots={true}
        min={33} // Minimum value
        max={123} // Maximum value
        step={10} // Step value
        onChange={(val) => onChange(val, "height")} // Callback function
      />
    ),
  },
  {
    title: "Depth",
    valtioKey: "depth",
    component: (
      <CustomRadioGroup
        initialValue={"32"} // Set the initial value
        radioOptions={depthRadioOptions}
        onChange={(val) => onChange(val, "depth")} // Callback function
        childMaxWidth={3.5}
      />
    ),
  },
  {
    title: "Feet",
    valtioKey: "feet",
    tooltip: (
      <div>
        <p>Plinth is not vailable for 24cm depth</p>
        <p className="mt-5">Note: Plint adds 10cm to the total shelf height</p>
      </div>
    ),
    component: (
      <CustomRadioGroup
        radioOptions={feetOptions}
        onChange={(val) => onChange(val, "feet")} // Callback function
        childMaxWidth={6}
      />
    ),
  },
  {
    title: "Back panels",
    valtioKey: "backPanels",
    component: (
      <CustomRadioGroup
        radioOptions={backPanelOptions}
        onChange={(val) => onChange(val, "backPanels")} // Callback function
        childMaxWidth={4}
      />
    ),
  },
  {
    title: "Finish",
    valtioKey: "finish",
    tooltip: (
      <div>
        <p>Standard</p>
        <p>Plinth</p>
      </div>
    ),
    component: (
      <CustomRadioGroup
        radioOptions={finishOptions}
        onChange={(val) => onChange(val, "finish")} // Callback function
        childMaxWidth={5}
      />
    ),
  },
  {
    title: "Color",
    valtioKey: "color",
    component: (
      <ColorRadioGroup
        colorRadioOptions={colorRadioOptions}
        onChange={(val) => onChange(val, "color")} // Callback function
        initialValue={colorRadioOptions[2].value}
      />
    ),
  },
];

const SideBarConfigurator = () => {
  const snap = useSnapshot(configuratorStore);
  // 3D guys use this snap.configurator to update the 3D model
  // console.log("snap", snap.configurator);
  // snap.configuartor will have the latest values
  // it will be updated when the user interacts with the configurator

  console.log("SNAP", snap.configurator);

  const [selectorConfigs, setSelectorConfigs] = useState(selectorConfigsStatic);

  return (
    <div className="bg-gray-100 h-[92vh] min-h-[700px] flex">
      <div className="w-[70%]">
        <ThreeDModelContainer />
      </div>
      <div className="w-[30%]">
        <CustomizationOptions
          configuratorValue={snap.configurator}
          selectorConfigs={selectorConfigs}
        />
      </div>
    </div>
  );
};

const ThreeDModelContainer = () => {
  return (
    <div className="relative">
      <div className="absolute right-5 top-20 flex flex-col gap-4">
        {modelButtonsData.map((data, index) => (
          <ModelButton key={index} icons={data.icons} text={data.text} />
        ))}
      </div>
    </div>
  );
};

const CustomizationOptions = ({ configuratorValue, selectorConfigs }) => {
  return (
    <div className="bg-white w-[90%] h-full p-5">
      <div>
        Reg. price <span className="line-through">1464 $</span> | Save{" "}
        <span className="text-red-700 font-semibold">439 $ </span> till 17.09
      </div>
      <div className="text-3xl text-red-800 font-semibold mt-1">1025 $</div>
      <div className="mt-1">
        The lowest price in the last 30 days before th epromotion: 893 $
      </div>
      <div className="flex flex-col my-2">
        {selectorConfigs.map(
          ({ title, component, valtioKey, tooltip }, index) => (
            <Selectors
              key={index} // Use a unique key for each component
              title={title}
              component={component}
              valtioValue={configuratorValue[valtioKey]}
              tooltip={tooltip}
            />
          )
        )}
      </div>
      <div className="flex flex-col gap-2 mt-2">
        <CustomButton
          type="primary"
          icon={<HiOutlineShoppingCart />}
          text="Add to cart"
        />
        <CustomButton
          type="secondary"
          icon={<BiHeart />}
          text="Save my design"
        />
      </div>
      <div className="w-full text-center text-gray-600 text-sm mt-2">
        Made in EU &#x2022; Ships in 12 - 13 weeks
      </div>
      <div className="underline underline-offset-4 w-full text-center cursor-pointer mt-3">
        View payment information
      </div>
    </div>
  );
};

const ModelButton = ({ icons, text }) => {
  return (
    <div className="relative group">
      {/* Tooltip div that appears on hover */}
      <div className="absolute right-0 group-hover:right-[40px] w-max top-1/2 transform -translate-y-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 bg-white text-gray-800 px-4 py-2 rounded-full border border-gray-300">
        {text}
      </div>

      {/* Button with hover effect */}
      <div className="w-8 h-8 bg-white text-black rounded-full border-2 border-transparent hover:border-gray-200 flex justify-center items-center cursor-pointer transition">
        {icons}
      </div>
    </div>
  );
};

const Selectors = ({ title, component, tooltip, valtioValue }) => {
  return (
    <div className="flex items-center my-2">
      <div className="w-[120px]">{title}</div>
      <div className="ms-5 w-full flex justify-start">
        {" "}
        {cloneElement(
          component,
          { initialValue: valtioValue } // Pass the value as a prop
        )}
        {
          tooltip && (
            <span className="w-full m-auto">
              <Tooltip
                arrow={false}
                autoAdjustOverflow={true}
                title={tooltip}
                placement="bottom"
                className="m-auto hover:text-theme-primary"
              >
                <HiOutlineQuestionMarkCircle className="text-gray-400 ml-2 text-xl cursor-pointer" />
              </Tooltip>
            </span>
          ) // Display the tooltip if it exists
        }
      </div>
    </div>
  );
};

export default SideBarConfigurator;
