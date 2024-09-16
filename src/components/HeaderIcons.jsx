import React from "react";
import { LuUser2 } from "react-icons/lu";
import { BiHeart } from "react-icons/bi";
import { HiOutlineShoppingCart } from "react-icons/hi";

const iconClasses = "cursor-pointer hover:text-theme-primary transition";

const HeaderIcons = () => {
  return (
    <div className="text-2xl flex items-center justify-center gap-2">
      <LuUser2 className={iconClasses} />
      <BiHeart className={iconClasses} />
      <HiOutlineShoppingCart className={iconClasses} />
    </div>
  );
};

export default HeaderIcons;
