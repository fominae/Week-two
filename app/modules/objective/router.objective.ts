import { FastifyInstance } from "fastify";
import * as objectiveController from "./controller.objective";
import { createObjectiveFSchema } from "./schemas/objective.schema";
import { updateObjectiveFSchema } from "./schemas/objective.schema";

export const objectiveRouter = async (app: FastifyInstance) => {
    app.post("", { schema: createObjectiveFSchema }, objectiveController.create);
    app.patch("/:id", { schema: updateObjectiveFSchema }, objectiveController.updateObjective);
    app.get("", {}, objectiveController.getObjectives);
};
