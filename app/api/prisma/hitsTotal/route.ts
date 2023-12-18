import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  try {
    // get all posts
    const posts = await prisma.post.findMany();

    // calculate total views
    let total = 0;
    for (const post of posts) {
      total += post.views;
    }
    console.log(total);

    return Response.json({ total });
  } catch (error) {
    console.error(error);
    return new Response("Something went wrong", { status: 200 });
  } finally {
    await prisma.$disconnect();
  }
}
