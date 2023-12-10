"use client";
import Link from "next/link";
import useSWR from "swr";
import { useTheme } from "next-themes";
import clsx from "clsx";

import { FaYoutube, FaGithub } from "react-icons/fa";
import { ArrowTrendingUpIcon } from "@heroicons/react/20/solid";

import FlipNumber from "@/components/FlipNumber";
import fetcher from "@/lib/fetcher";
import { addCommas } from "@/lib/utils";

export function YouTube() {
  const { data: youtubeData, error: youtubeDataError } = useSWR(
    `/api/youtube`,
    fetcher,
  );

  if (youtubeDataError) return <div>failed to load</div>;
  return addCommas(youtubeData?.subscribers);
}

export function GitHub() {
  const { data: githubData, error: githubDataError } = useSWR(
    `/api/github?username=Rohitha97`,
    fetcher,
  );

  if (githubDataError) return <div>failed to load</div>;
  return addCommas(githubData?.stars);
}

export default function Stats() {
  const { theme } = useTheme();
  const username = "Rohitha97";

  const { data: githubData, error: githubDataError } = useSWR(
    `/api/github?username=${username}`,
    fetcher,
  );
  const { data: postsData, error: postsError } = useSWR(
    `/api/prisma/hitsTotal`,
    fetcher,
  );

  return (
    <ul
      className={clsx(
        "animated-list space-y-2",
        theme === "terminal" ? "font-mono tracking-tight" : "",
      )}
    >
      <li className="transition-opacity">
        <Link
          className="flex items-center gap-3 no-underline"
          href={"https://github.com/Rohitha97"}
        >
          <FaGithub className="text-xl" />
          <div>
            <FlipNumber>
              {githubData ? addCommas(githubData?.stars) : "000"}
            </FlipNumber>
            <span> Repository Stars</span>
          </div>
        </Link>
      </li>
      <li className="transition-opacity">
        <Link
          className="flex items-center gap-3 no-underline"
          href={"https://github.com/Rohitha97"}
        >
          <FaGithub className="text-xl" />
          <div>
            <FlipNumber>
              {githubData ? addCommas(githubData?.repoCount) : "000"}
            </FlipNumber>
            <span> Projects</span>
          </div>
        </Link>
      </li>
      <li className="transition-opacity">
        <Link className="flex items-center gap-3" href="/blog">
          <ArrowTrendingUpIcon className="h-5 w-5" />
          <div>
            <FlipNumber>
              {postsData ? addCommas(postsData?.total) : "0,000"}
            </FlipNumber>
            <span> Total Blog Views</span>
          </div>
        </Link>
      </li>
    </ul>
  );
}
