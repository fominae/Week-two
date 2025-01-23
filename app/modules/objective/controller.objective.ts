import { FastifyReply, FastifyRequest } from "fastify";
import { sqlCon } from "../../common/config/kysely-config";
import { HttpStatusCode } from "../../common/enum/http-status-code";
import * as objectiveRepository from "./repository.objective";
import { CreateObjectiveInput, UpdateObjectiveInput } from "./schemas/objective.schema";

export async function updateObjective(
    req: FastifyRequest<{
        Body: UpdateObjectiveInput;
        Params: { id: string };
    }>,
    rep: FastifyReply
) {
    const { id } = req.params;

    try {
        const result = await objectiveRepository.updateObjective(sqlCon, id, req.body);
        return rep.code(200).send(result);
    } catch (error) {
        return rep.code(500).send({ error: "Ошибка при редактировании задачи" });
    }
}

export async function create(req: FastifyRequest<{ Body: CreateObjectiveInput }>, rep: FastifyReply) {
    const { title, description, notifyAt } = req.body;

    if (!req.user.id) {
        return rep.code(HttpStatusCode.UNAUTHORIZED).send({ message: "Пользователь не авторизован" });
    }

    const objective = {
        title,
        description,
        creatorid: req.user.id,
        notifyAt
    };

    try {
        const result = await objectiveRepository.create(sqlCon, objective);
        return rep.code(HttpStatusCode.OK).send(result);
    } catch (error) {
        return rep.code(500).send({ error: "Ошибка при создании задачи" });
    }



}
