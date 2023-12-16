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
  const path = `/${lang}${href}`;
  const seg = pathname.split("/").slice(0, 3).join("/");
  const active = path === seg;

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
