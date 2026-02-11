"use client";
import { Post as PostType } from ".contentlayer/generated";

import FlipNumber from "@/components/FlipNumber";

import useSWR from "swr";
import fetcher from "@/lib/fetcher";

export default function ViewCounter({
  lang,
  post,
}: {
  post: PostType;
  lang: any;
}) {
  const { data } = useSWR(`/api/hits/slug?slug=${post.slug}`, fetcher, {
    revalidateOnFocus: false,
  });
  const views = data?.Views;

  return (
    <span>
      <FlipNumber>{views}</FlipNumber> {lang === "en" ? "views" : "ビュー"}
    </span>
  );
}
