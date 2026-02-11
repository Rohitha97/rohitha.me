import { getTotalViews } from "@/lib/db";

export async function GET() {
  try {
    const total = await getTotalViews();
    return Response.json({ total });
  } catch (error) {
    console.error(error);
    return new Response("Something went wrong", { status: 500 });
  }
}
