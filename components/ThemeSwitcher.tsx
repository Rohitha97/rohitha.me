import { useEffect, useState } from "react";
import { Listbox } from "@headlessui/react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

import { MoonIcon, CheckIcon } from "@heroicons/react/20/solid";
import { SunIcon } from "@heroicons/react/24/outline";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <button
        className="
        relative 
        h-6
        w-12 
        rounded-full 
        px-1
        ring-2
        ring-gray-400
        transition-colors 
        duration-500
        ease-in 
        focus:outline-none
        dark:bg-secondary"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <div className="pb- flex items-center">
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:-rotate-0 dark:scale-100" />
        </div>
      </button>
    </>
  );
}
