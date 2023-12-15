import { allProjects, Post as PostType } from ".contentlayer/generated";
import { notFound } from "next/navigation";

import Link from "@/components/ui/Link";
import Mdx from "@/components/ui/MdxWrapper";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";

// type PostProps = {
//   post: PostType;
//   related: PostType[];
// };

export default async function Project({
  params,
  params: { lang },
}: {
  params: any;
  lang: Locale;
}) {
  const post = allProjects.find((post) => post.slug === params.slug);

  const { page } = await getDictionary(lang);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-20">
      <article>
        <div className="flex animate-in flex-col gap-3">
          <div className="flex gap-3 text-secondary">
            <p>{post.time}</p>
            {post.url && (
              <>
                <span>&middot;</span>
                <Link href={post.url} className="hover:text-primary">
                  {page.project.visitProject}
                </Link>
              </>
            )}
          </div>
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-primary">
            {lang === "en" ? post.title : post.title_jp}
          </h1>
          <p
            className="animate-in text-lg leading-tight text-secondary md:text-xl"
            style={{ "--index": 1 } as React.CSSProperties}
          >
            {lang === "en" ? post.description : post.description_jp}
          </p>
        </div>

        <div className="h-12" />
        <div
          className="project prose animate-in"
          style={{ "--index": 2 } as React.CSSProperties}
        >
          <Mdx code={post.body.code} />
        </div>
      </article>
      <div className="flex flex-col gap-20">
        <div className="flex flex-col gap-6">
          <h2> {page.project.Tags}</h2>
          <div className="flex flex-wrap gap-3 ">
            {post.tags.map((tag: string) => (
              <div
                key={tag}
                className="whitespace-nowrap rounded-lg bg-secondary px-4 py-1.5 text-sm text-secondary"
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h2>{page.about.connect}</h2>
          <p className="max-w-lg text-secondary">
            {page.project.connect}
            <a
              href="mailto:rohith_rathnayake@yahoo.com"
              className="text-primary underline"
            >
              rohith_rathnayake@yahoo.com
            </a>
            {page.project.connect1}{" "}
          </p>
        </div>

        <Link href={`/${lang}/projects`} className="text-primary underline">
          ← {page.project.allProject}
        </Link>
      </div>

      <div />
    </div>
  );
}
