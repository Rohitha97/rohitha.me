import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import clsx from "clsx";
import { Locale, i18n } from "@/i18n.config";

import { ThemeProvider } from "@/components/ThemeProvider";
import Navigation from "@/components/Navigation";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home | Rohitha Rathnayake",
  description:
    "I am a full-stack software engineer who basically just enjoys creating things.",
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    <html lang={params.lang}>
      <body
        className={clsx(
          inter.className,
          "width-full bg-primary text-primary antialiased",
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Navigation lang={params.lang} />
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
