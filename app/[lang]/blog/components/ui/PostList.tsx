"use client";

import type { Post as PostType } from ".contentlayer/generated";
import Post from "./Post";
import React, { useRef, useState } from "react";

function getRelativeCoordinates(
  event: React.MouseEvent<HTMLUListElement>,
  referenceElement: any,
) {
  const rect = referenceElement.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
}

type PostListProps = {
  posts: PostType[];
  page: any;
  lang: any;
};

export default function PostList({ lang, posts, page }: PostListProps) {
  const [mousePosition, setMousePosition] = useState({
    x: 240,
    y: 0,
  });
  const listRef = useRef(null);
  const handleMouseMove = (e: React.MouseEvent<HTMLUListElement>) => {
    setMousePosition(getRelativeCoordinates(e, listRef.current));
  };

  return (
    <ul
      ref={listRef}
      onMouseMove={(e) => handleMouseMove(e)}
      className="animated-list flex flex-col relative"
    >
      {page && page.home && posts.length === 0 && <p>{page.assets.noPosts}</p>}

      {posts.map((post) => (
        <Post
          key={post.slug}
          post={post}
          lang={lang}
          mousePosition={mousePosition}
        />
      ))}
    </ul>
  );
}
