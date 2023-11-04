import { z } from "zod";

export const GroupValidator = z.object({
  name: z.string().min(3).max(30),
});

export const GroupSubscriptionValidator = z.object({
  groupId: z.string(),
});

export type CreateGroupPayload = z.infer<typeof GroupValidator>;
export type SubscribeToGroupPayload = z.infer<
  typeof GroupSubscriptionValidator
>;
