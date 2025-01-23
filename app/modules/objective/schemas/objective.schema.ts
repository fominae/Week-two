import { z } from "zod";
import type { FastifySchema } from "fastify";

export const createObjectiveSchema = z.object({
    title: z.string().min(1).max(127),
    description: z.string().nullable().optional(),
    notifyAt: z.date().nullable().optional()
});

export const updateObjectiveSchema = z.object({
    title: z.string().min(1).max(127).optional(),
    description: z.string().nullable().optional(),
    notifyAt: z.date().nullable().optional(),
    is_completed: z.boolean().optional()
});

export type CreateObjectiveInput = z.infer<typeof createObjectiveSchema>;
export type UpdateObjectiveInput = z.infer<typeof updateObjectiveSchema>;
export const updateObjectiveFSchema: FastifySchema = { body: updateObjectiveSchema };
export const createObjectiveFSchema: FastifySchema = { body: createObjectiveSchema };