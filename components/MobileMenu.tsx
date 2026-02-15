"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";

interface NavLink {
  href: string;
  label: string;
}

const MobileMenu = ({
  lang,
  links,
  navigation,
}: {
  links: NavLink[];
  navigation: any;
  lang: any;
}) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Derive the current active link from the URL
  const currentPath = `/${pathname.split("/")[1]}`;
  const selectedLink =
    links.find((link) => `/${lang}/${link.href}` === currentPath) || links[0];

  // Close dropdown when clicking outside
  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, handleClickOutside]);

  return (
    <div className="relative ml-auto md:hidden" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 rounded-lg p-1 text-secondary focus:ring-0 focus-visible:outline-none"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        {navigation?.menu}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-5 w-5"
        >
          <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", bounce: 0.3, duration: 0.3 }}
            className="w-42 absolute right-0 mt-2 max-h-60 origin-top-right overflow-auto rounded-xl bg-white p-2 text-base capitalize shadow-lg focus:outline-none dark:bg-black sm:text-sm"
          >
            {links.map((link) => {
              const isSelected = link.href === selectedLink.href;
              return (
                <li key={link.href} role="option" aria-selected={isSelected}>
                  <Link
                    href={`/${lang}/${link.href}`}
                    onClick={() => setOpen(false)}
                    className="relative block cursor-default select-none rounded-md py-2 pl-10 pr-4 hover:bg-tertiary"
                  >
                    <span
                      className={clsx(
                        "block truncate",
                        isSelected ? "font-extrabold" : "font-normal",
                      )}
                    >
                      {link.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileMenu;
