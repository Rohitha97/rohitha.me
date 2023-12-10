import Image from "next/image";
import { Metadata } from "next";

import Link from "@/components/ui/Link";
import Section from "@/components/Section";
import ConnectLinks from "../../components/ConnectLinks";
import Workplaces from "./components/Workplaces";
import Gallery from "./components/Gallery";

import dbeetaLogo from "public/work/dbeeta.jpg";
import kaprukaLogo from "public/work/kapruka.png";

import teamKapruka from "public/gallery/team-kapruka.jpg";
import teamDbeeta from "public/gallery/team-dbeeta.jpg";
import logo from "public/logo/icon-512.png";

export const metadata: Metadata = {
  title: "About | Rohitha Rathnayake",
  description:
    "I am a full-stack software engineer who basically just enjoys creating things.",
};

export default function About() {
  return (
    <div className="flex flex-col gap-16 md:gap-24">
      <div>
        <h1 className="animate-in text-3xl font-bold tracking-tight">
          About Me
        </h1>
        <p
          className="animate-in text-secondary"
          style={{ "--index": 1 } as React.CSSProperties}
        >
          Just a quick glimpse.
        </p>
      </div>
      <div className="mb-8 lg:hidden">
        <div
          className="animate-in"
          style={{ "--index": 1 } as React.CSSProperties}
        >
          <Image
            src={teamKapruka}
            alt={"team kapruka"}
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
            src={teamDbeeta}
            alt={"team dbeeta"}
            width={220}
            height={260}
            className="pointer-events-none absolute inset-0 -top-48 left-[45%] w-48 rotate-6 rounded-2xl bg-gray-400 object-cover shadow-md md:left-[60%] md:w-56"
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
        <Section heading="About" headingAlignment="left">
          <div className="flex flex-col gap-6">
            <p>Hello world, I&apos;m Rohitha Rathnayake!</p>

            <p>
              I have a passion for design and am always looking for ways to
              incorporate it into my engineering work.
            </p>
            <p>
              In addition to coding, I also make{" "}
              <Link
                className="underline"
                href="https://www.youtube.com/channel/@brianruizy"
              >
                YouTube
              </Link>{" "}
              videos, where I focus on tech gear, creative vlogs, and a bit of
              personal development.
            </p>
            <p>
              When I&apos;m not at my desk I am probably lifting weights,
              playing soccer, or at a coffee shop :)
            </p>
          </div>
        </Section>

        <Section heading="Connect" headingAlignment="left">
          <div className="flex w-full flex-col gap-8">
            <p>
              Have a question or want to work with me? Feel free to{" "}
              <Link href="mailto:rohith_rathnayake@yahoo.com">email me</Link>.
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

        <Section heading="Work" headingAlignment="left">
          <div className="flex w-full flex-col gap-8">
            <p>
              {new Date().getFullYear() - 2022}+ years of professional
              development experience.
            </p>
            <p>
              Leveraging my passion for cutting-edge technology, I began my
              career as a freelancer, gaining valuable experience and honing my
              skills. I then transitioned to working at{" "}
              <Link className="underline" href="https://kapruka.com">
                Kapruka
              </Link>{" "}
              , one of Sri Lanka&apos;s largest e-commerce platforms, where I
              further developed my expertise. Subsequently, I joined{" "}
              <Link className="underline" href="https://dbeeta.com">
                Dbeeta
              </Link>{" "}
              , an Italian startup, as a full-stack engineer, contributing to
              their innovative projects and expanding my knowledge.
            </p>
            <Workplaces items={workplaces} />
          </div>
        </Section>
      </div>
    </div>
  );
}

const workplaces = [
  {
    title: "Associate Software Engineer",
    company: "Dbeeta Software Solutions",
    time: "Jan 2023 - Oct 2023",
    imageSrc: dbeetaLogo,
    link: "https://dbeeta.it",
  },
  {
    title: "Software Developer Intern",
    company: "Kapruka Holding PLC",
    time: "Sap 2022 - Jan 2023",
    imageSrc: kaprukaLogo,
    link: "https://kapruka.com/",
  },
  {
    title: "Freelancing Developer",
    company: "-",
    time: "Fab 2022 - Present",
    imageSrc: logo,
    link: "/",
  },
];
