"use client";

import React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

import white from "@/public/logo/logo-white.png";
import black from "@/public/logo/logo-black.png";

const Logo = () => {
  const { theme } = useTheme();
  return (
    <Image
      src={theme === "dark" ? white : black}
      alt="logo"
      width={40}
      height={40}
      className="rounded-full pt-2"
    />
  );
};

export default Logo;
