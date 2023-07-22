import { z } from "zod";

export const playerSchema = z.object({
    firstname: z.string().min(1),
    lastname: z.string().min(1),
    salary: z.string(),
    goal: z.number(),
});

export type Player = z.infer<typeof playerSchema> & {
    id: number;
    pictureURl?: string;
    devise?: string;
    salary?: number;
};
