import { Listbox } from "@headlessui/react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

import { LanguageIcon, CheckIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";

export default function LanguageSwitcher() {
  const [mounted, setMounted] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const languageOptions = [
    { id: "en", name: "English" },
    { id: "jp", name: "日本語" },
  ];

  return (
    <>
      <Listbox value={selectedLanguage} onChange={setSelectedLanguage}>
        {({ open }) => {
          const iconClassName = clsx(
            "w-5 h-5 text-secondary hover:text-primary cursor-pointer transition-colors",
            open ? "text-primary" : "text-secondary",
          );
          return (
            <div className="relative">
              <Listbox.Button
                className={clsx(
                  "relative flex h-8 w-8 cursor-default items-center justify-center rounded-full focus:outline-none",
                )}
              >
                <LanguageIcon className={iconClassName} />
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
                    {languageOptions.map((language) => (
                      <Listbox.Option
                        key={language.id}
                        className={({ active }) =>
                          clsx(
                            "relative cursor-default select-none rounded-md py-2 pl-10 pr-4",
                            active ? "bg-tertiary" : "",
                          )
                        }
                        value={language.name}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {language.name}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 dark:text-neutral-50">
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                )}
              </AnimatePresence>
            </div>
          );
        }}
      </Listbox>
    </>
  );
}
