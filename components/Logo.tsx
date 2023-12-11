"use client";

import React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
const Logo = () => {
  const { theme } = useTheme();
  return (
    <Image
      src={theme === "dark" ? "/logo/logo-white.png" : "/logo/logo-black.png"}
      alt="logo"
      width={40}
      height={40}
      className="rounded-full pt-2"
    />
  );
};

export default Logo;
