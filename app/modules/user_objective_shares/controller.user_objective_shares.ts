import { FastifyReply, FastifyRequest } from "fastify";
import { sqlCon } from "../../common/config/kysely-config";
import { sendEmail } from "../../common/config/nodemailer";
import { HttpStatusCode } from "../../common/enum/http-status-code";
import { uuidSchema } from "../objective/schemas/uuid.schema";
import * as userRepository from "../user/repository.user";
import * as shareRepository from "./repository.user_objective_shares";
import { ShareObjectiveInput } from "./schemas/user_objective_shares.schema";

export async function shareObjective(req: FastifyRequest<{ Body: ShareObjectiveInput; Params: { id: string } }>, rep: FastifyReply) {
    const { id: objectiveid } = req.params;
    const { userid } = req.body;
    const user = await userRepository.getById(sqlCon, userid);
    if (!user) {
        return rep.code(HttpStatusCode.NOT_FOUND).send({ message: "Пользователь не найден" });
    }
    if (req.user.id === userid) {
        return rep.code(HttpStatusCode.BAD_REQUEST).send({ message: "Нельзя предоставить доступ самому себе" });
    }
    if (user?.email) {
        await sendEmail(user.email, "Доступ к задаче предоставлен", `Вы получили доступ к задаче: ${objectiveid}.`);
    }
    await shareRepository.shareObjective(sqlCon, { userid, objectiveid });
    return rep.code(HttpStatusCode.OK).send({ message: "Доступ выдан" });
}
export async function revokeObjectiveAccess(req: FastifyRequest<{ Body: ShareObjectiveInput; Params: uuidSchema }>, rep: FastifyReply) {
    const { id } = req.params;
    const { userid } = req.body;
    const user = await userRepository.getById(sqlCon, userid);
    if (!user) {
        return rep.code(HttpStatusCode.NOT_FOUND).send({ message: "Пользователь не найден" });
    }
    if (req.user.id === userid) {
        return rep.code(HttpStatusCode.BAD_REQUEST).send({ message: "Нельзя удалить доступ у самого себя" });
    }
    await shareRepository.revokeAccess(sqlCon, id);
    return rep.code(HttpStatusCode.OK).send({ message: "Доступ удалён" });
}
export async function getUsersWithAccess(req: FastifyRequest<{ Params: uuidSchema }>, rep: FastifyReply) {
    const { id: objectiveid } = req.params;
    const usersWithAccess = await shareRepository.getSharedUsers(sqlCon, objectiveid);

    return rep.code(HttpStatusCode.OK).send(usersWithAccess);
}
