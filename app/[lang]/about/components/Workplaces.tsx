"use client";
import Image, { StaticImageData } from "next/image";
import { useTheme } from "next-themes";
import clsx from "clsx";

import Link from "@/components/ui/Link";
import { Locale } from "@/i18n.config";

type Workplace = {
  title: string;
  company: string;
  imageSrc: string | StaticImageData;
  time?: string;
  link?: string;
  translations: any;
};

function Workplace({
  company,
  title,
  time,
  imageSrc,
  link,
  lang,
  translations,
}: Workplace & { lang: Locale }) {
  const { theme } = useTheme();

  const getTranslation = (translations: any, key: string) => {
    return translations[key] ? translations[key][lang] : "";
  };

  const titleTR = getTranslation(translations, "title");
  const timeTR = getTranslation(translations, "time");

  const content = (
    <>
      <div className="flex items-center gap-4">
        <Image
          src={imageSrc}
          alt={company}
          width={48}
          height={48}
          className={clsx(
            "rounded-full",
            company === "University of Houston" && "bg-neutral-50",
          )}
        />
        <div className="flex flex-col gap-px">
          <p className={link ? "external-arrow" : ""}>{titleTR}</p>
          <p className="text-secondary">{company}</p>
        </div>
      </div>
      {timeTR && <time className="text-secondary">{timeTR}</time>}
    </>
  );
  return (
    <li className="transition-opacity" key={company}>
      {link ? (
        <Link
          href={link}
          className="-mx-3 -my-2 flex w-full justify-between px-3 py-2 no-underline"
        >
          {content}
        </Link>
      ) : (
        <div className="flex justify-between ">{content}</div>
      )}
    </li>
  );
}

export default function Workplaces({
  items,
  lang,
}: {
  items: any[];
  lang: Locale;
}) {
  return (
    <ul className="animated-list flex flex-col gap-8">
      {items.map((workplace) => (
        <Workplace
          key={workplace.company}
          company={workplace.company}
          imageSrc={workplace.imageSrc}
          link={workplace.link}
          translations={workplace.translations}
          lang={lang}
          title={workplace.title}
        />
      ))}
    </ul>
  );
}
