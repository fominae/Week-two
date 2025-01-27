import { z } from "zod";
import type { FastifySchema } from "fastify";

export const createObjectiveSchema = z.object({
    title: z.string().min(1).max(127),
    description: z.string().nullable().optional(),
    notifyAt: z.string().datetime().nullable().optional()
});
export type CreateObjectiveInput = z.infer<typeof createObjectiveSchema>;
export const createObjectiveFSchema: FastifySchema = { body: createObjectiveSchema };