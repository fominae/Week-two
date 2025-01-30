import { type Insertable, type Kysely, Transaction } from "kysely";
import { DB, UserObjectiveShares } from "../../common/types/kysely/db.type";

type InsertableShareRowType = Insertable<UserObjectiveShares>;

export async function shareObjective(con: Kysely<DB> | Transaction<DB>, entity: InsertableShareRowType) {
    return await con.insertInto("user_objective_shares").values(entity).executeTakeFirst();
}

export async function getSharedUsers(con: Kysely<DB>, objectiveId: string) {
    return await con.selectFrom("user_objective_shares").select(["userid"]).where("objectiveid", "=", objectiveId).execute();
}
export async function revokeAccess(con: Kysely<DB>, objectiveId: string) {
    return await con.deleteFrom("user_objective_shares").where("objectiveid", "=", objectiveId).execute();
}
