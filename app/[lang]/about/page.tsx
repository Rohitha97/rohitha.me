import Image from "next/image";
import { Metadata } from "next";

import Link from "@/components/ui/Link";
import Section from "@/components/Section";
import ConnectLinks from "@/components/ConnectLinks";
import Workplaces from "./components/Workplaces";
import Gallery from "./components/Gallery";

import dbeetaLogo from "public/work/dbeeta.jpg";
import kaprukaLogo from "public/work/kapruka.png";
import horizonLogo from "public/work/Untitled.png";
import humanLogo from "public/work/human_resocia_git_logo.jpeg";

import village from "public/gallery/village.jpg";
import random from "public/gallery/random-click.jpg";
import logo from "public/logo/icon-512.png";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";

export const metadata: Metadata = {
  title: "About | Rohitha Rathnayake",
  description:
    "I am a full-stack software engineer who basically just enjoys creating things.",
};

export default async function About({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { page } = await getDictionary(lang);

  return (
    <div className="flex flex-col gap-16 md:gap-24">
      <div>
        <h1 className="animate-in text-3xl font-bold tracking-tight">
          {page.about.title}
        </h1>
        <p
          className="animate-in text-secondary"
          style={{ "--index": 1 } as React.CSSProperties}
        >
          {page.about.tag}
        </p>
      </div>
      <div className="mb-8 lg:hidden">
        <div
          className="animate-in"
          style={{ "--index": 1 } as React.CSSProperties}
        >
          <Image
            src={village}
            alt={"village"}
            width={324}
            height={139}
            className="pointer-events-none relative inset-0 h-60 -rotate-6 rounded-2xl bg-gray-400 object-cover shadow-md"
            priority
          />
        </div>

        <div
          className="animate-in"
          style={{ "--index": 2 } as React.CSSProperties}
        >
          <Image
            src={random}
            alt={"Random Click"}
            width={220}
            height={260}
            className="pointer-events-none absolute inset-0 -top-56 left-[45%] w-48 rotate-6 rounded-2xl bg-gray-400 object-cover shadow-md md:left-[60%] md:w-56"
            priority
          />
        </div>
      </div>
      <div className="hidden lg:block">
        <Gallery />
      </div>
      <div
        className="flex animate-in flex-col gap-16 md:gap-24"
        style={{ "--index": 3 } as React.CSSProperties}
      >
        <Section heading={page.about.title} headingAlignment="left">
          <div className="flex flex-col gap-6">
            <p>{page.about.description1}</p>

            <p>{page.about.description2}</p>
            <p>{page.about.description3}</p>
            <p>{page.about.description4}</p>
          </div>
        </Section>

        <Section heading={page.about.connect} headingAlignment="left">
          <div className="flex w-full flex-col gap-8">
            <p>
              {page.about.connectDescription}{" "}
              <Link href="mailto:rohith_rathnayake@yahoo.com">
                {page.assets.emailMe}
              </Link>
              .
            </p>
            <ul className="animated-list grid flex-grow grid-cols-1 gap-2 md:grid-cols-2">
              {ConnectLinks.map((link) => (
                <li className="col-span-1 transition-opacity" key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-grid w-full rounded-lg border border-primary p-4 no-underline transition-opacity"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{link.icon}</span>
                      {link.label}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="ml-auto h-5 w-5 text-secondary"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        <Section heading={page.about.work} headingAlignment="left">
          <div className="flex w-full flex-col gap-8">
            <p>
              {new Date().getFullYear() - 2022}+ {page.about.workDescription1}
            </p>
            <p>{page.about.workDescription2}</p>
            <p>{page.about.workDescription3}</p>
            <p>{page.about.workDescription4}</p>
            <Workplaces items={workplaces} lang={lang} />
          </div>
        </Section>

        <Section heading={page.about.education} headingAlignment="left">
          <div className="flex w-full flex-col gap-8">
            <p>{page.about.eduDescription}</p>
            <Workplaces items={academy} lang={lang} />
          </div>
        </Section>
      </div>
    </div>
  );
}

const workplaces = [
  {
    company: "Human Resocia Co., Ltd.",
    imageSrc: humanLogo,
    link: "https://resocia.jp/",
    translations: {
      title: {
        en: "Software Engineer",
        jp: "ソフトウェア エンジニア",
      },
      time: {
        en: "Fab 2024 - Present",
        jp: "2023年2月 - 現在",
      },
    },
  },
  {
    company: "Dbeeta Software Solutions",
    imageSrc: dbeetaLogo,
    link: "https://dbeeta.it",
    translations: {
      title: {
        en: "Associate Software Engineer",
        jp: "ソフトウェア エンジニア",
      },
      time: {
        en: "Jan 2023 - Oct 2023",
        jp: "2023年1月 - 2023年10月",
      },
    },
  },
  {
    company: "Kapruka Holding PLC",
    imageSrc: kaprukaLogo,
    link: "https://kapruka.com/",
    translations: {
      title: {
        en: "Software Developer Intern",
        jp: "ソフトウェア エンジニア インターン",
      },
      time: {
        en: "Sep 2022 - Jan 2023",
        jp: "2022年9月 - 2023年1月",
      },
    },
  },
  {
    company: "-",
    imageSrc: logo,
    link: "/",
    translations: {
      title: {
        en: "Freelancing Developer",
        jp: "フリーランス開発者",
      },
      time: {
        en: "Fab 2022 - Present",
        jp: "2022年2月 - 現在",
      },
    },
  },
];

const academy = [
  {
    company: "Horizon Campus",
    imageSrc: horizonLogo,
    link: "https://horizoncampus.edu.lk/",
    translations: {
      title: {
        en: "BIT(Hons) in NMC",
        jp: "BIT(Hons) in NMC",
      },
      time: {
        en: "May 2019 - Aug 2023",
        jp: "2019年5月 - 2023年8月",
      },
    },
  },
];
