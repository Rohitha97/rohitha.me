import "./globals.css";
import type { Metadata } from "next";
import { Space_Grotesk, Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import clsx from "clsx";
import { Locale, i18n } from "@/i18n.config";

import { ThemeProvider } from "@/components/ThemeProvider";
import Navigation from "@/components/Navigation";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { constructMetadata, constructViewport } from "@/lib/utils";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata = constructMetadata();
export const viewport = constructViewport();

export async function generateStaticParams(): Promise<{ lang: Locale }[]> {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const paramsValue = await params;
  const lang = paramsValue.lang as Locale;
  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={clsx(
          spaceGrotesk.variable,
          outfit.variable,
          "font-body width-full bg-primary text-primary antialiased",
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navigation lang={lang} />
          <div
            className={
              "mx-auto max-w-[700px] px-6 pb-24 pt-16 md:px-6 md:pb-44 md:pt-20"
            }
          >
            {children}
            <SpeedInsights />
            <Analytics />
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
