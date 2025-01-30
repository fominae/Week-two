import { FastifyInstance } from "fastify";
import { checkAccessObjective } from "../objective/guard/check-access-objective";
import { uuidFSchema } from "../objective/schemas/uuid.schema";
import * as shareController from "./controller.user_objective_shares";
import { shareObjectiveFSchema } from "./schemas/user_objective_shares.schema";

export const shareRouter = async (app: FastifyInstance) => {
    app.post("/:id/share", { schema: shareObjectiveFSchema, preHandler: app.auth([checkAccessObjective]) }, shareController.shareObjective);
    app.delete("/:id/revoke", { schema: uuidFSchema, preHandler: app.auth([checkAccessObjective]) }, shareController.revokeObjectiveAccess);
};
