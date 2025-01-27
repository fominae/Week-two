import { z } from "zod";
import type { FastifySchema } from "fastify";

export const updateObjectiveSchema = z.object({
    title: z.string().min(1).max(127).optional(),
    description: z.string().nullable().optional(),
    notifyAt: z.string().datetime().nullable().optional(),
    isCompleted: z.preprocess((value) => {
        if (value === "true") return true;
        if (value === "false") return false;
        return value;
    }, z.boolean().optional())
});

export type UpdateObjectiveInput = z.infer<typeof updateObjectiveSchema>;
export const updateObjectiveFSchema: FastifySchema = { body: updateObjectiveSchema };