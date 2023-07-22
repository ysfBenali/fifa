import { z } from "zod";

export const PlayerSchema = z.object({
    firstname: z.string().min(1),
    lastname: z.string().min(1),
    salary: z.string(),
    goal: z.string().transform((val) => parseInt(val)),
});

export type Player = z.infer<typeof PlayerSchema>;
