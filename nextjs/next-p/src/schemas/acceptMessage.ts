import { z } from "zod";

export const acceptMessages = z.object({
    accept :z.boolean()
})