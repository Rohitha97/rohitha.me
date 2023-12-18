// lib/utils.ts

import { Metadata } from "next";
import logo from "../public/logo/play_store_512.png";

export function addCommas(x: any) {
  if (x === undefined || x === null) return "0";
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function constructMetadata({
  title = "Rohitha Rathnayake",
  description = "I am a full-stack software engineer who basically just enjoys creating things.",
  image = "public/logo/play_store_512.png",
  icons = "/favicon.ico",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    icons,
    metadataBase: new URL("https://rohitha.me"),
    themeColor: "#FFF",
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
