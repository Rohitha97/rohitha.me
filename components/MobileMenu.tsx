"use client";
import { useState, useEffect } from "react";
import { Listbox } from "@headlessui/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";

interface Link {
  href: string;
  label: string;
}

const MobileMenu = ({
  lang,
  links,
  navigation,
}: {
  links: Link[];
  navigation: any;
  lang: any;
}) => {
  const pathname = `/${usePathname().split("/")[1]}`;

  const [selectedLink, setSelectedLink] = useState(links[0]);

  useEffect(() => {
    const currentLink =
      links.find((link) => `/${lang}/${link.href}` === pathname) || links[0];
    setSelectedLink(currentLink);
  }, [pathname, links, lang]);

  const handleSelect = (link: any) => {
    setSelectedLink(link);
  };

  // console.log(selectedLink);

  return (
    <div className="relative ml-auto md:hidden">
      <Listbox value={selectedLink} onChange={handleSelect}>
        {({ open }) => (
          <div className="relative">
            <Listbox.Button className="flex items-center gap-1 rounded-lg p-1 text-secondary focus:ring-0 focus-visible:outline-none">
              {navigation?.menu}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
              </svg>
            </Listbox.Button>
            <AnimatePresence>
              {open && (
                <Listbox.Options
                  as={motion.ul}
                  static
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", bounce: 0.3, duration: 0.3 } as any}
                  className="w-42 absolute right-0 mt-2 max-h-60 origin-top-right overflow-auto rounded-xl bg-white p-2 text-base capitalize shadow-lg focus:outline-none dark:bg-black sm:text-sm"
                >
                  {links.map((link) => (
                    <Link key={link.href} href={`/${lang}/${link.href}`}>
                      <Listbox.Option
                        key={link.href}
                        value={link}
                        className={({ active }) =>
                          clsx(
                            "relative cursor-default select-none rounded-md py-2 pl-10 pr-4",
                          )
                        }
                      >
                        {({ selected }) => (
                          <span
                            className={`block truncate ${
                              selected ? "font-extrabold" : "font-normal"
                            }`}
                          >
                            {link.label}
                          </span>
                        )}
                      </Listbox.Option>
                    </Link>
                  ))}
                </Listbox.Options>
              )}
            </AnimatePresence>
          </div>
        )}
      </Listbox>
    </div>
  );
};

export default MobileMenu;
