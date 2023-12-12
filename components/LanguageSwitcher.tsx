"use client";
import { Listbox } from "@headlessui/react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageIcon, CheckIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { i18n } from "@/i18n.config";
import { useEffect, useState } from "react";

export default function LanguageSwitcher() {
  const pathName = usePathname();
  const [currentLocale, setCurrentLocale] = useState(() => {
    if (typeof window !== "undefined") {
      const storedLocale = window.localStorage.getItem("locale");
      return storedLocale || i18n.defaultLocale;
    }
    return i18n.defaultLocale;
  });

  useEffect(() => {
    localStorage.setItem("locale", currentLocale);
  }, [currentLocale]);

  const redirectedPathName = (locale: string) => {
    if (!pathName) return "/";

    const pathnameIsMissingLocale = i18n.locales.every(
      (locale) =>
        !pathName.startsWith(`/${locale}/`) && pathName !== `/${locale}`,
    );

    if (pathnameIsMissingLocale) {
      return locale === i18n.defaultLocale ? pathName : `/${locale}${pathName}`;
    }

    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <Listbox value={currentLocale} onChange={setCurrentLocale}>
      {({ open }) => (
        <div className="relative">
          <Listbox.Button
            className={clsx(
              "relative flex h-8 w-8 cursor-default items-center justify-center rounded-full focus:outline-none",
            )}
          >
            <LanguageIcon
              className={clsx(
                "h-5 w-5 cursor-pointer text-secondary transition-colors hover:text-primary",
                open ? "text-primary" : "text-secondary",
              )}
            />
          </Listbox.Button>

          <AnimatePresence>
            {open && (
              <Listbox.Options
                as={motion.ul}
                static
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", bounce: 0.3, duration: 0.3 }}
                className="w-42 absolute right-0 mt-2 max-h-60 origin-top-right overflow-auto rounded-xl bg-white p-2 text-base capitalize shadow-lg focus:outline-none dark:bg-black sm:text-sm"
              >
                {i18n.locales.map((locale) => (
                  <Link href={redirectedPathName(locale)} key={locale}>
                    <Listbox.Option
                      className={({ active }) =>
                        clsx(
                          "relative cursor-default select-none rounded-md py-2 pl-10 pr-4",
                          active ? "bg-tertiary" : "",
                        )
                      }
                      value={locale} // Set the value to the current locale
                      key={locale} // Also, ensure the key is set here
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {locale === "en" ? "English" : "日本語"}
                          </span>
                          {selected && (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 dark:text-neutral-50">
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          )}
                        </>
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
  );
}
