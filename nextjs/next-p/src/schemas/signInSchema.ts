import { z } from "zod";

export const signIn = z.object({
    verified: z.boolean()
})