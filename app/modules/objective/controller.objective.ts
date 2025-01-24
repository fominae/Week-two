import { FastifyReply, FastifyRequest } from "fastify";
import { sqlCon } from "../../common/config/kysely-config";
import { HttpStatusCode } from "../../common/enum/http-status-code";
import * as objectiveRepository from "./repository.objective";
import { CreateObjectiveInput, UpdateObjectiveInput } from "./schemas/objective.schema";
import { validate as isUUID } from "uuid";
import { GetObjectivesQuery } from "./schemas/objective.schema";

export async function updateObjective(
    req: FastifyRequest<{
        Body: UpdateObjectiveInput;
        Params: { id: string };
    }>,
    rep: FastifyReply
) {
    const { id } = req.params;

    if (!req.user.id) {
        return rep.code(HttpStatusCode.UNAUTHORIZED).send({ message: "Пользователь не авторизован" });
    }

    try {
        const task = await objectiveRepository.getObjectiveById(sqlCon, id);
        if (!task || task.creatorid !== req.user.id) {
            return rep.code(HttpStatusCode.FORBIDDEN).send({ message: "Доступ к задаче запрещён" });
        }
        const result = await objectiveRepository.updateObjective(sqlCon, id, req.body);
        return rep.code(HttpStatusCode.OK).send(result);
    } catch (error) {
        return rep.code(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error: "Ошибка при редактировании задачи" });
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

export async function getObjectives(req: FastifyRequest<{ Querystring: GetObjectivesQuery }>, rep: FastifyReply) {
    const { id, search, isCompleted, sortByTitle, sortByCreatedAt, sortByNotifyAt, limit, offset } = req.query as {
        id?: string;
        search?: string;
        isCompleted?: string;
        sortByTitle?: "asc" | "desc";
        sortByCreatedAt?: "asc" | "desc";
        sortByNotifyAt?: "asc" | "desc";
        limit?: string;
        offset?: string;
    };

    if (!req.user.id) {
        return rep.code(HttpStatusCode.UNAUTHORIZED).send({ message: "Пользователь не авторизован" });
    }

    if (id && !isUUID(id)) {
        return rep.code(HttpStatusCode.BAD_REQUEST).send({ error: "Неверный формат ID задачи" });
    }

    try {
        const objectives = await objectiveRepository.getObjectives(sqlCon, {
            search,
            isCompleted: isCompleted === undefined ? undefined : isCompleted === "true",
            sortByTitle,
            sortByCreatedAt,
            sortByNotifyAt,
            limit: limit ? parseInt(limit, 10) : undefined,
            offset: offset ? parseInt(offset, 10) : undefined,
            creatorid: req.user.id
        });

        return rep.code(200).send(objectives);
    } catch (error) {
        return rep.code(500).send({ error: "Ошибка при получении списка задач" });
    }
}

