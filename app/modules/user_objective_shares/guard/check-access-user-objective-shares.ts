import { FastifyRequest } from "fastify";
import { sqlCon } from "../../../common/config/kysely-config";
import { HttpStatusCode } from "../../../common/enum/http-status-code";
import { CustomException } from "../../../common/exceptions/custom-exception";

export async function checkAccessUserObjectiveShare(req: FastifyRequest) {
    const { id } = req.params as { id: string };
    const userid = req.user.id;

    const sharedAccess = await sqlCon.selectFrom("user_objective_shares").where("objectiveid", "=", id).where("userid", "=", userid!).select("id").executeTakeFirst();

    if (!sharedAccess) {
        throw new CustomException(HttpStatusCode.FORBIDDEN, "Доступ к задаче запрещён", {
            publicMessage: "Доступ к задаче запрещён"
        });
    }
}
