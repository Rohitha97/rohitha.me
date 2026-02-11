import React from "react";
import { getDictionary } from "@/lib/dictionary";
import { Locale } from "@/i18n.config";
import NavigationClient from "./NavigationClient";

/**
 * Server component wrapper that fetches dictionary and passes to client nav
 */
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
    <NavigationClient lang={lang} links={links} navigation={navigation} />
  );
}
