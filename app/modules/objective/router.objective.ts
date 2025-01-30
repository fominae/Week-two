import { FastifyInstance } from "fastify";
import { checkAccessUserObjectiveShare } from "../user_objective_shares/guard/check-access-user-objective-shares";
import * as objectiveController from "./controller.objective";
import { checkAccessObjective } from "./guard/check-access-objective";
import { createObjectiveFSchema } from "./schemas/create.schema";
import { getObjectivesFSchema } from "./schemas/get-all-objectives.schema";
import { updateObjectiveFSchema } from "./schemas/update.schema";
import { uuidFSchema } from "./schemas/uuid.schema";

export const objectiveRouter = async (app: FastifyInstance) => {
    app.post("", { schema: createObjectiveFSchema }, objectiveController.create);
    app.patch("/:id", { schema: updateObjectiveFSchema, preHandler: app.auth([checkAccessObjective]) }, objectiveController.updateObjective);
    app.get("", { schema: getObjectivesFSchema }, objectiveController.getObjectives);
    app.get("/:id", { schema: uuidFSchema, preHandler: app.auth([checkAccessObjective, checkAccessUserObjectiveShare]) }, objectiveController.getObjectiveById);
    app.delete("/:id", { schema: uuidFSchema, preHandler: app.auth([checkAccessObjective]) }, objectiveController.deleteObjective);
};
