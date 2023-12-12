import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";
import { allPosts, Post as PostType } from ".contentlayer/generated";

import Tags from "@/components/Tags";
import Link from "@/components/ui/Link";
import { formatDate } from "lib/formatdate";

import Avatar from "@/public/avatar.png";
import { Locale } from "@/i18n.config";
import ViewCounter from "../components/ui/ViewCounter";
import Mdx from "@/components/ui/MdxWrapper";

type PostProps = {
  post: PostType;
  related: PostType[];
};

type Props = {
  params: {
    slug: string;
    id: string;
    lang: Locale;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const post = allPosts.find((post) => post.slug === params.slug);

  if (!post) {
    throw new Error("Post not found");
  }

  const {
    title,
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

export default async function Post({ params }: { params: any }) {
  const post = allPosts.find((post) => post.slug === params.slug);

  // const seoTitle = `${post.title} | Rohitha Rathnayake`;
  // const seoDesc = `${post.summary}`;
  // const url = `https://rohitha.me/blog/${post.slug}`;
  // const MDXContent = useMDXComponent(post?.body.code);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-20">
      <article>
        <div
          className="flex animate-in flex-col gap-8"
          style={{ "--index": 1 } as React.CSSProperties}
        >
          <div className="max-w-xl space-y-2">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-primary">
              {post.title}
            </h1>
            <p className="text-lg leading-tight text-secondary md:text-xl">
              {post.summary}
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
                  {formatDate(post.publishedAt)}
                </time>
                {post.updatedAt
                  ? `(Updated ${formatDate(post.updatedAt)})`
                  : ""}
                {" · "}
                <ViewCounter post={post} />
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
          <Mdx code={post.body.code} />
        </div>
      </article>

      <Tags tags={post.tags} />

      {/* <Subscribe /> */}

      <Link href={`/${params.lang}/blog`}>← All Blogs</Link>
    </div>
  );
}
