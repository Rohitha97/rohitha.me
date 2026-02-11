"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

import white from "@/public/logo/logo-white.png";
import black from "@/public/logo/logo-black.png";

const Logo = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-[40px] w-[40px] pt-2" />;
  }

  return (
    <Image
      src={resolvedTheme === "dark" ? white : black}
      alt="logo"
      width={40}
      height={40}
      className="rounded-full pt-2"
    />
  );
};

export default Logo;
