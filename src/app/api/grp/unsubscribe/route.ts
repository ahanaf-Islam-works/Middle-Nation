import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { GroupSubscriptionValidator } from "@/lib/validators/groups";
import z from "zod";
export async function POST(req: Request) {
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

    if (!subscription) {
      return new Response("Already unsubscribed", { status: 400 });
    }

    // chek if user is creator of the group
    const group = await db.group.findFirst({
      where: {
        id: groupId,
        creatorId: session.user.id,
      },
    });

    if (group) {
      return new Response("Creator cannot unsubscribe", { status: 400 });
    }
    // Group Unsubscribe
    await db.subscription.delete({
      where: {
        userId_groupId: {
          groupId,
          userId: session.user.id,
        },
      },
    });

    return new Response(groupId, { status: 200 });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return new Response(e.message, { status: 422 });
    }

    return new Response("Could not UnSubscibe, please try again later", {
      status: 500,
    });
  }
}
