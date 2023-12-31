import { formatDate } from "@/lib/formatdate";
import type { Post } from ".contentlayer/generated";
import Section from "@/components/Section";
import Link from "@/components/ui/Link";
import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";

type PostProps = {
  post: Post;
  lang: any;
  mousePosition?: {
    x: number;
    y: number;
  };
};

export default function Post({ lang, post, mousePosition }: PostProps) {
  const { publishedAt, slug, title, image } = post;
  let publishDate = new Date(publishedAt);
  const showNewBadge =
    Math.abs(new Date(publishDate).getTime() - new Date().getTime()) /
      (24 * 60 * 60 * 1000) <
    30;
  const imageHeight = 150;
  const imageWidth = 300;
  const imageOffset = 24;

  let publishDateString: string = publishDate.toLocaleDateString();
  let postTitle = title;
  if (lang === "jp") {
    postTitle = post.title_jp;
    publishDateString = new Date(publishDate).toLocaleDateString("ja-JP");
  }
  return (
    <li className="group py-3 transition-opacity">
      <div className="transition-opacity">
        {image && mousePosition && (
          <motion.div
            animate={{
              top: mousePosition.y - imageHeight - imageOffset,
              left: mousePosition.x - imageWidth / 2,
            }}
            initial={false}
            transition={{ ease: "easeOut" }}
            style={{ width: imageWidth, height: imageHeight }}
            className="pointer-events-none absolute z-10 hidden overflow-hidden rounded bg-primary shadow-sm sm:group-hover:block"
          >
            <Image
              src={image}
              alt={postTitle}
              width={imageWidth}
              height={imageHeight}
            />
          </motion.div>
        )}
        <div className="flex items-center justify-between gap-6">
          <Section heading={formatDate(publishedAt)}>
            <Link
            
              href={`/${lang}/blog/${slug}`}
              className="font-medium leading-tight"
            >
              {postTitle}
            </Link>
          </Section>
          <div className="min-w-24 relative aspect-square h-24 w-24 drop-shadow-sm md:hidden">
            <Image
              src={image}
              alt={postTitle}
              fill
              className="rounded object-cover"
            />
          </div>
        </div>
      </div>
    </li>
  );
}
