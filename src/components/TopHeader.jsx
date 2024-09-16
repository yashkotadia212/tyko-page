import React from "react";
import Navbar from "./Navbar";
import LogoContainer from "./LogoContainer";
import HeaderIcons from "./HeaderIcons";

const links = [
  { text: "Home", url: "/" },
  { text: "Services", url: "/services" },
  { text: "Pricing", url: "/pricing" },
  { text: "Contact", url: "/contact" },
];

const TopHeader = () => {
  return (
    <div className="flex items-center justify-between sm:px-2 md:px-6 xl:px-10 bg-white">
      <div className="w-1/3 flex justify-start items-center">
        <Navbar links={links} />
      </div>
      <div className="w-1/3 flex justify-center items-center">
        <LogoContainer />
      </div>
      <div className="w-1/3 flex justify-end items-center">
        <HeaderIcons />
      </div>
    </div>
  );
};

export default TopHeader;
