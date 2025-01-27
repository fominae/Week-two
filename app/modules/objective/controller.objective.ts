import { FastifyReply, FastifyRequest } from "fastify";
import { sqlCon } from "../../common/config/kysely-config";
import { HttpStatusCode } from "../../common/enum/http-status-code";
import * as objectiveRepository from "./repository.objective";
import { CreateObjectiveInput } from "./schemas/create.schema";
import { GetObjectivesQuery } from "./schemas/get-all-objectives.schema";
import { UpdateObjectiveInput } from "./schemas/update.schema";
import { uuidSchema } from "./schemas/uuid.schema";

export async function updateObjective(
    req: FastifyRequest<{
        Body: UpdateObjectiveInput;
        Params: uuidSchema;
    }>,
    rep: FastifyReply
) {
    const { id } = req.params;
    const result = await objectiveRepository.updateObjective(sqlCon, id, req.body);
    return rep.code(HttpStatusCode.OK).send(result);
}

export async function create(req: FastifyRequest<{ Body: CreateObjectiveInput }>, rep: FastifyReply) {
    const objective = {
        ...req.body,
        creatorid: req.user.id!
    };
    const result = await objectiveRepository.create(sqlCon, objective);
    return rep.code(HttpStatusCode.OK).send(result);
}

export async function getObjectives(req: FastifyRequest<{ Querystring: GetObjectivesQuery }>, rep: FastifyReply) {
    const objectives = await objectiveRepository.getObjectives(sqlCon, req.user.id!, req.query);
    return rep.code(HttpStatusCode.OK).send(objectives);
}

export async function getObjectiveById(req: FastifyRequest<{ Params: uuidSchema }>, rep: FastifyReply) {
    const { id } = req.params;
    const objective = await objectiveRepository.getObjectiveById(sqlCon, id);
    return rep.code(HttpStatusCode.OK).send(objective);
}
