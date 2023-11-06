import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { GroupSubscriptionValidator } from "@/lib/validators/groups";
import z from "zod";
export async function POST(req: Request) {
  console.log("works");
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { groupId } = GroupSubscriptionValidator.parse(body);

    const subscription = await db.subscription.findFirst({
      where: {
        groupId,
        userId: session.user.id,
      },
    });

    if (subscription) {
      return new Response("Already subscribed", { status: 400 });
    }

    await db.subscription.create({
      data: {
        groupId,
        userId: session.user.id,
      },
    });

    return new Response(groupId, { status: 200 });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return new Response(e.message, { status: 422 });
    }

    return new Response("Could not Subscibe, please try again later", {
      status: 500,
    });
  }
}
