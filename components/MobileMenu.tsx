"use client";
import React, { Fragment, useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Popover, Transition } from "@headlessui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

interface Link {
  href: string;
  label: string;
}

const MobileMenu = ({
  links,
  navigation,
}: {
  links: Link[];
  navigation: any;
}) => {
  const pathname = `/${usePathname().split("/")[1]}`;
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <Popover className="relative ml-auto md:hidden">
      <Popover.Button
        className="flex items-center gap-1 rounded-lg p-1 text-secondary focus:ring-0 focus-visible:outline-none"
        onClick={() => setIsOpen(!isOpen)}
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
      </Popover.Button>
      <Transition
        as={Fragment}
        show={isOpen}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel
          ref={menuRef}
          className="absolute right-0 z-10 mt-2 w-40 origin-top-right overflow-auto rounded-xl bg-white p-2 text-base shadow-lg focus:outline-none dark:bg-black sm:text-sm"
          static
        >
          <div className="grid">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "rounded-md px-4 py-2 transition-colors hover:text-primary",
                  pathname === link.href
                    ? "bg-tertiary font-medium"
                    : "font-normal",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default MobileMenu;
