import { FastifyReply, FastifyRequest } from "fastify";
import { sqlCon } from "../../../common/config/kysely-config";
import { HttpStatusCode } from "../../../common/enum/http-status-code";
import * as objectiveRepository from "../repository.objective";

export async function checkAccessObjective(req: FastifyRequest, rep: FastifyReply) {
    const { id } = req.params as { id: string };
    const objective = await objectiveRepository.getObjectiveById(sqlCon, id);
    if (!objective) {
        return rep.code(HttpStatusCode.NOT_FOUND).send({
            message: "Такой задачи не существует"
        });
    }
    if (!objective || objective.creatorid !== req.user.id) {
        return rep.code(HttpStatusCode.FORBIDDEN).send({ message: "Доступ к задаче запрещён" });
    }

    (req as any).task = objective;
}
