import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { allProjects, Project } from ".contentlayer/generated";
import Halo from "@/components/ui/Halo";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";

export const metadata: Metadata = {
  title: "Projects | Rohitha Rathnayake",
  description: "Here are some of the projects I've worked on.",
};

export default async function Blog({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const projects = allProjects;
  const { page } = await getDictionary(lang);

  return (
    <div className="mx-auto max-w-[700px]">
      <div className="flex flex-col gap-16 md:gap-24 ">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="animate-in text-3xl font-bold tracking-tight">
              {page.project.title}
            </h1>
            <p
              className="animate-in text-secondary"
              style={{ "--index": 1 } as React.CSSProperties}
            >
              {page.project.tag}
            </p>
          </div>
        </div>
        <ul
          className="animated-list flex animate-in flex-col"
          style={{ "--index": 3 } as React.CSSProperties}
        >
          {projects.map((project, i) => (
            <li
              key={project.slug}
              className={clsx(
                "flex flex-col gap-4 py-6 transition-opacity first:pt-0 last:pb-0 md:flex-row md:gap-6",
              )}
            >
              <Link
                href={`/projects/${project.slug}`}
                className="aspect-video w-full select-none overflow-clip rounded-lg border border-secondary bg-tertiary md:w-2/5"
              >
                <Halo strength={10}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                    className="h-full w-full "
                  />
                </Halo>
              </Link>
              <div className="w-full space-y-2 md:w-3/5">
                <div>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="font-medium text-primary hover:underline"
                  >
                    {project.title}
                  </Link>
                  <time className="text-secondary"> · {project.time}</time>
                </div>

                <p className="line-clamp-3 text-tertiary">
                  {project.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
