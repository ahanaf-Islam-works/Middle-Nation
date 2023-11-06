import type { Post, Group, User, Vote, Comment } from "@prisma/client";

export type ExtendedPost = Post & {
  group: Group;
  votes: Vote[];
  author: User;
  comments: Comment[];
};
