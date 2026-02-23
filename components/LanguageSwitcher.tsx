"use client";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageIcon, CheckIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { i18n } from "@/i18n.config";
import { useState, useRef, useCallback, useEffect } from "react";

export default function LanguageSwitcher() {
  const pathName = usePathname();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Derive current locale from the URL path, not localStorage
  const currentLocale = (() => {
    if (!pathName) return i18n.defaultLocale;
    const segments = pathName.split("/").filter(Boolean);
    const firstSegment = segments[0];
    if (i18n.locales.includes(firstSegment as any)) {
      return firstSegment;
    }
    return i18n.defaultLocale;
  })();

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
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full focus:outline-none"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <LanguageIcon
          className={clsx(
            "h-5 w-5 text-secondary transition-colors hover:text-primary",
            open && "text-primary",
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", bounce: 0.3, duration: 0.3 }}
            className="w-42 absolute right-0 mt-2 max-h-60 origin-top-right overflow-auto rounded-xl bg-primary p-2 text-base capitalize shadow-lg ring-1 ring-primary focus:outline-none dark:bg-black sm:text-sm"
          >
            {i18n.locales.map((locale) => (
              <li key={locale} role="option" aria-selected={locale === currentLocale}>
                <Link
                  href={redirectedPathName(locale)}
                  onClick={() => {
                    setOpen(false);
                  }}
                  className={clsx(
                    "relative block cursor-default select-none rounded-md py-2 pl-10 pr-4 hover:bg-tertiary",
                  )}
                >
                  <span
                    className={clsx(
                      "block truncate",
                      locale === currentLocale ? "font-medium" : "font-normal",
                    )}
                  >
                    {locale === "en" ? "English" : "日本語"}
                  </span>
                  {locale === currentLocale && (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 dark:text-neutral-50">
                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
