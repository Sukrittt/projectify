import { z } from "zod";

export const updateUserValidator = z.object({
  avatarConfig: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  username: z.string().optional(),
  gender: z.string().optional(),
  birthday: z.string().optional(),
});
