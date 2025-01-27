import { z } from "zod";
import type { FastifySchema } from "fastify";

export const getObjectivesSchema = z.object({
    search: z.string().optional(),
    isCompleted: z.enum(["true", "false"]).optional(),
    sortBy: z.enum(["title", "createdAt", "notifyAt"]).optional(),
    sortDirection: z.enum(["asc", "desc"]).optional(),
    limit: z.coerce.number().min(1),
    offset: z.coerce.number().min(0)
});

export type GetObjectivesQuery = z.infer<typeof getObjectivesSchema>;
export const getObjectivesFSchema: FastifySchema = { querystring: getObjectivesSchema };
