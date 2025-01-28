import { FastifyRequest } from "fastify";
import { sqlCon } from "../../../common/config/kysely-config";
import { HttpStatusCode } from "../../../common/enum/http-status-code";
import { CustomException } from "../../../common/exceptions/custom-exception";
import * as objectiveRepository from "../repository.objective";

export async function checkAccessObjective(req: FastifyRequest) {
    const { id } = req.params as { id: string };
    const objective = await objectiveRepository.getObjectiveById(sqlCon, id);
    if (!objective) {
        throw new CustomException(HttpStatusCode.NOT_FOUND, "Такой задачи не существует", {
            publicMessage: "Такой задачи не существует"
        });
    }
    if (!objective || objective.creatorid !== req.user.id) {
        throw new CustomException(HttpStatusCode.FORBIDDEN, "Доступ к задаче запрещён", {
            publicMessage: "Доступ к задаче запрещён"
        });
    }
}
