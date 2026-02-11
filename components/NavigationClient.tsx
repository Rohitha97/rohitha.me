"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Logo from "./Logo";
import ThemeSwitcher from "./ThemeSwitcher";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileMenu from "./MobileMenu";
import { springConfigs } from "@/lib/motion";
import { Locale } from "@/i18n.config";

interface NavigationClientProps {
  lang: Locale;
  links: { href: string; label: string }[];
  navigation: Record<string, string>;
}

/**
 * Navigation - "Refined Technical" Design
 * Editorial aesthetic with physics-based hover interactions
 */
export default function NavigationClient({
  lang,
  links,
  navigation,
}: NavigationClientProps) {
  return (
    <header className="sticky top-0 z-20 bg-primary/80 backdrop-blur-md border-b border-secondary/50">
      <nav className="mx-auto flex max-w-[700px] items-center justify-between gap-4 px-4 py-4 md:px-6">
        {/* Logo with spring hover */}
        <motion.div
          whileHover={{ scale: 1.05, rotate: -2 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", ...springConfigs.snappy }}
        >
          <Link
            href={`/${lang}`}
            className="shrink-0 text-primary hover:text-acid transition-colors"
          >
            <Logo />
          </Link>
        </motion.div>

        {/* Desktop Navigation Links */}
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link, index) => (
            <li key={link.href}>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.1,
                  type: "spring",
                  ...springConfigs.gentle,
                }}
              >
                <Link
                  href={`/${lang}${link.href}`}
                  className="group relative px-3 py-2 font-display text-sm uppercase tracking-wider text-secondary hover:text-primary transition-colors"
                >
                  {link.label}
                  {/* Acid green underline on hover */}
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-acid scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-spring" />
                </Link>
              </motion.div>
            </li>
          ))}
        </ul>

        {/* Mobile Menu */}
        <MobileMenu lang={lang} links={links} navigation={navigation} />

        {/* Controls */}
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", ...springConfigs.snappy }}
            className="h-8 w-8"
          >
            <LanguageSwitcher />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", ...springConfigs.snappy }}
            className="h-8"
          >
            <ThemeSwitcher />
          </motion.div>
        </div>
      </nav>
    </header>
  );
}
