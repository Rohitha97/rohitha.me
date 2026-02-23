"use client";

import Image from "next/image";
import Link from "@/components/ui/Link";
import { motion } from "framer-motion";
import { ArrowUpRightIcon } from "@heroicons/react/20/solid";
import Avatar from "@/public/avatar.png";
import Stats from "@/components/Stats";
import {
  AnimatedContainer,
  AnimatedItem,
} from "@/components/AnimatedText";
import { springConfigs, heroTextReveal, staggerChild } from "@/lib/motion";
import { Locale } from "@/i18n.config";

interface HeroSectionProps {
  page: {
    home: {
      firstName: string;
      lastName: string;
      tag: string;
      description: string;
    };
    assets: {
      emailMe: string;
      moreWays: string;
    };
  };
  lang: Locale;
}

/**
 * Hero Section - "Refined Technical" Design
 * Asymmetric layout, spring physics, editorial typography
 */
export default function HeroSection({ page, lang }: HeroSectionProps) {
  return (
    <section className="relative min-h-[70vh] flex flex-col justify-center">
      {/* Subtle gradient accent */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-acid/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-acid/3 rounded-full blur-2xl pointer-events-none" />

      <AnimatedContainer className="flex flex-col gap-6 md:gap-8">
        {/* Name - Massive display typography, asymmetric positioning */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={heroTextReveal}
          className="relative"
        >
          <h1 className="headline-xl text-primary tracking-tight">
            {page.home.firstName}
            <br />
            {page.home.lastName}
          </h1>
          {/* Subtle accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              delay: 0.5,
              duration: 0.8,
              type: "spring",
              ...springConfigs.gentle,
            }}
            className="absolute -bottom-2 left-0 h-[2px] w-24 bg-acid origin-left"
          />
        </motion.div>

        {/* Tag line */}
        <AnimatedItem>
          <p className="text-lg md:text-xl text-secondary font-body max-w-md">
            {page.home.tag}
          </p>
        </AnimatedItem>

        {/* Avatar + Stats - Asymmetric layout */}
        <AnimatedItem className="flex flex-col items-start md:flex-row md:items-start gap-6 mt-4">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: "spring", ...springConfigs.snappy }}
            className="relative"
          >
            <Image
              src={Avatar}
              width={100}
              height={100}
              alt="avatar"
              className="rounded-2xl bg-secondary ring-2 ring-acid/20"
              priority
            />
            {/* Status indicator */}
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-acid rounded-full border-2 border-[var(--gray-1)]" />
          </motion.div>
          <Stats page={page} lang={lang} />
        </AnimatedItem>

        {/* Description with generous whitespace */}
        <AnimatedItem>
          <p className="max-w-lg text-primary text-base md:text-lg leading-relaxed">
            {page.home.description}
          </p>
        </AnimatedItem>

        {/* CTA Links */}
        <AnimatedItem>
          <ul className="flex flex-col md:flex-row gap-4 md:gap-8 mt-2">
            <li>
              <motion.div
                whileHover={{ x: 4 }}
                transition={{ type: "spring", ...springConfigs.snappy }}
              >
                <Link
                  href="mailto:rohith_rathnayake@yahoo.com"
                  className="group flex items-center gap-2 text-secondary hover:text-acid transition-colors no-underline"
                >
                  <ArrowUpRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  <span className="font-display text-sm tracking-wide uppercase">
                    {page.assets.emailMe}
                  </span>
                </Link>
              </motion.div>
            </li>
            <li>
              <motion.div
                whileHover={{ x: 4 }}
                transition={{ type: "spring", ...springConfigs.snappy }}
              >
                <Link
                  href={`/${lang}/links`}
                  className="group flex items-center gap-2 text-secondary hover:text-acid transition-colors no-underline"
                >
                  <ArrowUpRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  <span className="font-display text-sm tracking-wide uppercase">
                    {page.assets.moreWays}
                  </span>
                </Link>
              </motion.div>
            </li>
          </ul>
        </AnimatedItem>
      </AnimatedContainer>
    </section>
  );
}
