import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { GroupValidator } from "@/lib/validators/groups";
import z from "zod";
export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { name } = GroupValidator.parse(body);
    const groupExist = await db.group.findFirst({ where: { name } });
    if (groupExist) {
      return new Response("Group already exist", { status: 409 });
    }

    const group = await db.group.create({
      data: {
        name,
        creatorId: session.user.id,
      },
    });
    await db.subscription.create({
      data: {
        userId: session.user.id,
        groupId: group.id,
      },
    });
    return new Response(JSON.stringify(group.name), { status: 200 });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return new Response(e.message, { status: 422 });
    }

    return new Response("Could not create group", { status: 500 });
  }
}
