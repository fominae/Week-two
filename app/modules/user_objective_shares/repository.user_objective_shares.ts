import { type Insertable, type Kysely, Transaction } from "kysely";
import { DB, UserObjectiveShares } from "../../common/types/kysely/db.type";

type InsertableShareRowType = Insertable<UserObjectiveShares>;

export async function shareObjective(con: Kysely<DB> | Transaction<DB>, entity: InsertableShareRowType) {
    return await con.insertInto("user_objective_shares").values(entity).executeTakeFirst();
}

export async function getSharedUsers(con: Kysely<DB>, objectiveid: string) {
    return await con
        .selectFrom("user_objective_shares")
        .innerJoin("users", "users.id", "user_objective_shares.userid")
        .select(["users.id", "users.name"])
        .where("user_objective_shares.objectiveid", "=", objectiveid)
        .execute();
}
export async function revokeAccess(con: Kysely<DB>, objectiveId: string, userid: string) {
    return await con.deleteFrom("user_objective_shares").where("objectiveid", "=", objectiveId).where("userid", "=", userid).execute();
}

export async function checkUserAccess(con: Kysely<DB>, objectiveId: string, userId: string) {
    return await con
        .selectFrom("user_objective_shares")
        .select("id")
        .where("objectiveid", "=", objectiveId)
        .where("userid", "=", userId)
        .execute();
}