import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { PostValidator } from "@/lib/validators/post";
import z from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { title, groupId, content } = PostValidator.parse(body);

    const subscription = await db.subscription.findFirst({
      where: {
        groupId,
        userId: session.user.id,
      },
    });
    if (!subscription) {
      return new Response("Not subscribed", { status: 400 });
    }
    await db.post.create({
      data: {
        title,
        groupId,
        content,
        authorId: session.user.id,
      },
    });
    return new Response(groupId, { status: 200 });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return new Response(e.message, { status: 422 });
    }

    return new Response("Could not post, please try again later", {
      status: 500,
    });
  }
}
