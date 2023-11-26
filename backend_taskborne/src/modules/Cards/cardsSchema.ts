import { z } from "zod";


const findByIdSchema = z.object({
    id: z.string(),
})


const cardsSchema = z.object({
    projectId: z.string(),
    title: z.string().optional(),
    status: z.enum(["TODO", "IN_PROGRESS", "DONE"]).optional(), // Use an enum with the allowed values
});
const createCardsSchema = z.object({
    projectId: z.string(),
    title: z.string(),
    status: z.enum(["TODO", "IN_PROGRESS", "DONE"]), // Use an enum with the allowed values
});

export type FindByIdSchema = z.infer<typeof findByIdSchema>;
export type CardsSchema = z.infer<typeof cardsSchema>;
export type CreateCardsSchema = z.infer<typeof createCardsSchema>;