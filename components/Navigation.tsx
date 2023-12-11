// "use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import NavLink from "./ui/NavLink";
import ThemeSwitcher from "./ThemeSwitcher";
import Logo from "./Logo";

import { getDictionary } from "@/lib/dictionary";
import { Locale } from "@/i18n.config";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileMenu from "./MobileMenu";

interface NavigationData {
  home: string;
  blog: string;
  about: string;
  projects: string;
  menu: string;
}

export default async function Navigation({ lang }: { lang: Locale }) {
  const { navigation } = await getDictionary(lang);

  const links = navigation
    ? [
        { href: `/about`, label: navigation.about },
        { href: `/blog`, label: navigation.blog },
        { href: `/projects`, label: navigation.projects },
      ]
    : [];

  return (
    <header className="relative top-0 z-20 bg-primary md:sticky">
      <nav className="lg mx-auto flex max-w-[700px] items-center justify-between gap-4 px-4 py-3 md:px-6 ">
        <NavLink lang={lang} href="/" className="shrink-0 text-primary">
          <Logo />
        </NavLink>
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <NavLink lang={lang} href={link.href}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <MobileMenu links={links} navigation={navigation} />

        <div className="flex space-x-4">
          <div className="h-8 w-8">
            <LanguageSwitcher />
          </div>
          <div className="h-8 w-16 pt-1">
            <ThemeSwitcher />
          </div>
        </div>
      </nav>
    </header>
  );
}
