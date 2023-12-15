import Image from "next/image";
import Link from "@/components/ui/Link";
import { allPosts } from ".contentlayer/generated";

import PostList from "./blog/components/ui/PostList";
import Stats from "@/components/Stats";
import { ArrowUpRightIcon } from "@heroicons/react/20/solid";
import Avatar from "@/public/avatar.png";
import { getDictionary } from "@/lib/dictionary";
import { Locale } from "@/i18n.config";

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const posts = allPosts
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    // 3 most recent
    .filter((_, i) => i < 3);

  const { page } = await getDictionary(lang);

  return (
    <div className="flex flex-col gap-16 md:gap-24">
      <div className="flex animate-in flex-col gap-8">
        <div>
          <h1 className="animate-in text-3xl font-bold tracking-tight text-primary">
            {page.home.name}
          </h1>
          <p
            className="animate-in text-secondary"
            style={{ "--index": 1 } as React.CSSProperties}
          >
            {page.home.tag}
          </p>
        </div>
        <div
          className="flex animate-in flex-col gap-6 text-secondary md:flex-row md:items-center"
          style={{ "--index": 1 } as React.CSSProperties}
        >
          <Image
            src={Avatar}
            width={85}
            height={85}
            alt="avatar"
            className="rounded-full bg-secondary"
          />
          <Stats page={page} lang={lang} />
        </div>
        <p
          className="max-w-lg animate-in text-primary"
          style={{ "--index": 2 } as React.CSSProperties}
        >
          {page.home.description}
        </p>
        <ul
          className="animated-list flex animate-in flex-col gap-2 text-secondary md:flex-row md:gap-6"
          style={{ "--index": 2 } as React.CSSProperties}
        >
          <li className="transition-opacity">
            <Link
              href="mailto:rohith_rathnayake@yahoo.com"
              className="flex items-center gap-2 no-underline"
            >
              <ArrowUpRightIcon className="h-5 w-5" />
              <span>{page.assets.emailMe}</span>
            </Link>
          </li>
          <li className="transition-opacity">
            <Link
              href={`/${lang}/links`}
              className="flex items-center gap-2 no-underline"
            >
              <ArrowUpRightIcon className="h-5 w-5" />
              <span>{page.assets.moreWays}</span>
            </Link>
          </li>
        </ul>
      </div>
      <div
        className="flex animate-in flex-col gap-8"
        style={{ "--index": 3 } as React.CSSProperties}
      >
        <h2 className="text-secondary">{page.assets.latestPost}</h2>
        <PostList posts={posts} lang={lang} page={page} />
        <Link
          href={`/${lang}/blog`}
          className="text-secondary underline underline-offset-4 hover:text-primary"
        >
          {page.assets.seeAll}
        </Link>
      </div>
    </div>
  );
}
