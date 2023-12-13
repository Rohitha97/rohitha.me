"use client";
import Link from "next/link";
import { ReactNode } from "react";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { i18n } from "@/i18n.config";

type NavLinkProps = {
  href: string;
  lang: string;
  children: React.ReactNode;
  [key: string]: any;
};

export default function NavLink({
  href,
  lang,
  children,
  ...props
}: NavLinkProps) {
  const pathname = usePathname();
  const isDefaultLang = lang === i18n.defaultLocale;
  const path = isDefaultLang ? href : `/${lang}${href}`;
  const seg = pathname.split("/").slice(2, 3).join("/");
  const defSeg = seg === "" ? pathname : `/${seg}`;
  const active = path === pathname;

  // console.log("defseg - ", seg);
  // console.log("pathname - ", pathname);
  // console.log("path - ", path);

  return (
    <Link
      className={clsx(
        "rounded-lg px-4 py-2 text-sm transition-colors hover:text-primary",
        active ? "bg-secondaryA text-primary" : "text-secondary",
      )}
      href={path}
      {...props}
    >
      {children}
    </Link>
  );
}
