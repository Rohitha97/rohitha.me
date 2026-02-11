import { NextRequest } from "next/server";
import { getViews, incrementViews } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const slug = searchParams.get("slug");

    if (!slug) {
      return new Response("Please provide a slug", { status: 400 });
    }

    // Determine if we should increment or just get.
    // The original implementation incremented on every call if the slug existed?
    // Let's look at the original code.
    // Original:
    // if (!post) { create new (views=1) } else { update (views+1) }
    // So it ALWAYS increments on GET.
    
    // However, usually we might want to separate "viewing" (increment) from "fetching stats" (get).
    // The `ViewCounter` component calls this. It seems to imply counting a view.
    // So I will keep the behavior: Increment and return new count.

    const views = await incrementViews(slug);

    return new Response(JSON.stringify({ Views: views }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
