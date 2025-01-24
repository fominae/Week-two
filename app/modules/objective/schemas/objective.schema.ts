import { z } from "zod";
import type { FastifySchema } from "fastify";

export const createObjectiveSchema = z.object({
    title: z.string().min(1).max(127),
    description: z.string().nullable().optional(),
    notifyAt: z.string().datetime().nullable().optional()
});

export const updateObjectiveSchema = z.object({
    title: z.string().min(1).max(127).optional(),
    description: z.string().nullable().optional(),
    notifyAt: z.string().datetime().nullable().optional(),
    is_completed: z.boolean().optional()
});

export const getObjectivesSchema = z.object({
    search: z.string().optional(),
    isCompleted: z.enum(["true", "false"]).optional(),
    sortByTitle: z.enum(["asc", "desc"]).optional(),
    sortByCreatedAt: z.enum(["asc", "desc"]).optional(),
    sortByNotifyAt: z.enum(["asc", "desc"]).optional(),
    limit: z.string().regex(/^\d+$/).optional(),
    offset: z.string().regex(/^\d+$/).optional()
});

export type GetObjectivesQuery = z.infer<typeof getObjectivesSchema>;
export type CreateObjectiveInput = z.infer<typeof createObjectiveSchema>;
export type UpdateObjectiveInput = z.infer<typeof updateObjectiveSchema>;
export const updateObjectiveFSchema: FastifySchema = { body: updateObjectiveSchema };
export const createObjectiveFSchema: FastifySchema = { body: createObjectiveSchema };