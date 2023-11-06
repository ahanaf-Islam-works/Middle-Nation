import z from "zod";

export const PostValidator = z.object({
  title: z
    .string()
    .min(5, {
      message: "Title must be between 5  characters long",
    })
    .max(255, {
      message: "Title must be between 255 characters long",
    }),
  groupId: z.string(),
  content: z.any(),
});

export type PostCreationRequest = z.infer<typeof PostValidator>;
