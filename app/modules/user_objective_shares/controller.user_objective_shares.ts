import { FastifyReply, FastifyRequest } from "fastify";
import { sqlCon } from "../../common/config/kysely-config";
import { HttpStatusCode } from "../../common/enum/http-status-code";
import { uuidSchema } from "../objective/schemas/uuid.schema";
import * as shareRepository from "./repository.user_objective_shares";
import { ShareObjectiveInput } from "./schemas/user_objective_shares.schema";

export async function shareObjective(req: FastifyRequest<{ Body: ShareObjectiveInput; Params: { id: string } }>, rep: FastifyReply) {
    const { id: objectiveid } = req.params;
    const { userid } = req.body;
    await shareRepository.shareObjective(sqlCon, { userid, objectiveid });
    return rep.code(HttpStatusCode.OK).send({ message: "Доступ выдан" });
}

export async function revokeObjectiveAccess(req: FastifyRequest<{ Params: uuidSchema }>, rep: FastifyReply) {
    const { id } = req.params;
    await shareRepository.revokeAccess(sqlCon, id);
    return rep.code(HttpStatusCode.OK).send({ message: "Доступ удалён" });
}
export async function getUsersWithAccess(req: FastifyRequest<{ Params: uuidSchema }>, rep: FastifyReply) {
    const { id: objectiveid } = req.params;
    const usersWithAccess = await shareRepository.getSharedUsers(sqlCon, objectiveid);

    return rep.code(HttpStatusCode.OK).send(usersWithAccess);
}
