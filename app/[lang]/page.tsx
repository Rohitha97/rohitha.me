import Link from "@/components/ui/Link";
import { allPosts } from ".contentlayer/generated";

import PostList from "./blog/components/ui/PostList";
import HeroSection from "@/components/HeroSection";
import { getDictionary } from "@/lib/dictionary";
import { Locale } from "@/i18n.config";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: langStr } = await params;
  const lang = langStr as Locale;
  const posts = allPosts
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    // 3 most recent
    .filter((_, i) => i < 3);

  const { page } = await getDictionary(lang);

  return (
    <div className="flex flex-col gap-20 md:gap-32 bg-grain">
      {/* Hero Section - New "Refined Technical" design */}
      <HeroSection page={page} lang={lang} />

      {/* Latest Posts Section */}
      <section
        className="flex flex-col gap-8"
        style={{ "--index": 4 } as React.CSSProperties}
      >
        <h2 className="font-display text-sm uppercase tracking-wider text-secondary">
          {page.assets.latestPost}
        </h2>
        <PostList posts={posts} lang={lang} page={page} />
        <Link
          href={`/${lang}/blog`}
          className="group inline-flex items-center gap-2 text-secondary hover:text-acid underline underline-offset-4 transition-colors"
        >
          <span>{page.assets.seeAll}</span>
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </section>
    </div>
  );
}
