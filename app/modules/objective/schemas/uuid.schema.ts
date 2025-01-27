import { FastifySchema } from "fastify";
import { z } from "zod";

const uuidSchema = z.object({
    id: z.string().uuid()
});

export type uuidSchema = z.TypeOf<typeof uuidSchema>;
export const uuidFSchema: FastifySchema = { params: uuidSchema };
