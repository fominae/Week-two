import type { FastifySchema } from "fastify";
import { z } from "zod";

export const shareObjectiveSchema = z.object({
    userid: z.string().uuid()
});

export type ShareObjectiveInput = z.infer<typeof shareObjectiveSchema>;
export const shareObjectiveFSchema: FastifySchema = { body: shareObjectiveSchema };
