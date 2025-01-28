import { FastifyInstance } from "fastify";
import * as objectiveController from "./controller.objective";
import { checkAccessObjective } from "./guard/check-access-objective";
import { createObjectiveFSchema } from "./schemas/create.schema";
import { getObjectivesFSchema } from "./schemas/get-all-objectives.schema";
import { updateObjectiveFSchema } from "./schemas/update.schema";
import { uuidFSchema } from "./schemas/uuid.schema";

export const objectiveRouter = async (app: FastifyInstance) => {
    app.post("", { schema: createObjectiveFSchema, config: { isPublic: false } }, objectiveController.create);
    app.patch("/:id", { schema: updateObjectiveFSchema, config: { isPublic: false }, preHandler: app.auth([checkAccessObjective]) }, objectiveController.updateObjective);
    app.get("", { schema: getObjectivesFSchema, config: { isPublic: false } }, objectiveController.getObjectives);
    app.get("/:id", { schema: uuidFSchema, preHandler: app.auth([checkAccessObjective]) }, objectiveController.getObjectiveById);
};
