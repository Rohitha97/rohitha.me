import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";
import { allPosts, allPostJps, Post as PostType } from ".contentlayer/generated";

import Tags from "@/components/Tags";
import Link from "@/components/ui/Link";
import { formatDate } from "lib/formatdate";

import Avatar from "@/public/avatar.png";
import { Locale } from "@/i18n.config";
import ViewCounter from "../components/ui/ViewCounter";
import Mdx from "@/components/ui/MdxWrapper";
import { getDictionary } from "@/lib/dictionary";

type Props = {
  params: Promise<{
    slug: string;
    id: string;
    lang: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const params = await props.params;
  const post = allPosts.find((post) => post.slug === params.slug);

  if (!post) {
    throw new Error("Post not found");
  }

  const {
    title,
    title_jp,
    publishedAt: publishedTime,
    summary: description,
    image,
    slug,
  } = post;

  const ogImage = `https://rohitha.me/${image}`;

  const metadata: Metadata = {
    title: `${title} | Rohitha Rathnayake`,
    description,
    openGraph: {
      title: `${title} | Rohitha Rathnayake`,
      description,
      type: "article",
      publishedTime,
      url: `https://rohitha.me/blog/${title}`,
      images: [
        {
          url: `https://rohitha.me/api/og?title=${title}`,
          alt: title,
        },
      ],
    },
  };

  return metadata;
}

export default async function Post({ params }: { params: Promise<any> }) {
  const { slug, lang: langStr } = await params;
  const lang = langStr as Locale;
  const post = allPosts.find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  // Logic to get Japanese content
  let bodyCode = post.body.code;
  if (lang === "jp") {
    const jpPost = allPostJps.find((p) => p.slug === slug);
    if (jpPost) {
      bodyCode = jpPost.body.code;
    }
  }

  const { page } = await getDictionary(lang);

  return (
    <div className="flex flex-col gap-20">
      <article>
        <div
          className="flex animate-in flex-col gap-8"
          style={{ "--index": 1 } as React.CSSProperties}
        >
          <div className="max-w-xl space-y-2">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-primary">
              {lang === "en" ? post.title : post.title_jp}
            </h1>
            <p className="text-lg leading-tight text-secondary md:text-xl">
              {lang === "en" ? post.summary : post.summary_jp}
            </p>
          </div>

          <div className="flex max-w-none items-center gap-4">
            <Image
              src={Avatar}
              width={40}
              height={40}
              alt="avatar"
              className="rounded-full bg-secondary"
            />
            <div className="leading-tight">
              <p className="font-medium text-primary">Rohitha Rathnayake</p>
              <p className="text-secondary">
                <time dateTime={post.publishedAt}>
                  {lang === "en"
                    ? formatDate(post.publishedAt)
                    : post.publishedAt_jp}
                </time>
                {post.updatedAt
                  ? `(Updated ${formatDate(post.updatedAt)})`
                  : ""}
                {" · "}
                <ViewCounter lang={lang} post={post} />
              </p>
            </div>
          </div>
        </div>

        {post.image && (
          <>
            <div className="h-8" />
            <Image
              src={post.image}
              alt={`${post.title} post image`}
              width={700}
              height={350}
              className="-ml-6 w-[calc(100%+48px)] max-w-none animate-in md:rounded-lg lg:-ml-16 lg:w-[calc(100%+128px)]"
              style={{ "--index": 2 } as React.CSSProperties}
              priority
              quality={100}
            />
          </>
        )}

        <div className="h-16" />
        <div
          className="prose prose-neutral animate-in"
          style={{ "--index": 3 } as React.CSSProperties}
        >
          <Mdx code={bodyCode} />
        </div>
      </article>

      <Tags tags={post.tags} />

      {/* <Subscribe /> */}

      <Link href={`/${lang}/blog`}>← {page.blog.allBlog}</Link>
    </div>
  );
}
