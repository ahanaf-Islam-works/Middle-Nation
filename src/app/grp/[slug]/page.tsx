import MiniCreatePost from "@/components/MiniCreatePost";
import PostFeed from "@/components/PostFeed";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    slug: string;
  };
}

const page = async ({ params }: PageProps) => {
  const session = await getAuthSession();
  const { slug } = params;
  const group = await db.group.findFirst({
    where: { name: slug },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
          comments: true,
          group: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: INFINITE_SCROLL_PAGINATION_RESULTS,
      },
    },
  });

  if (!group) return notFound();
  return (
    <>
      <h1 className="font-bold text-3xl md:text-4xl h-14">grp/{group.name}</h1>
      <ul className="list-none">
        <MiniCreatePost session={session} />
        <PostFeed initialPosts={group.posts} groupName={group.name} />
      </ul>
    </>
  );
};

export default page;
