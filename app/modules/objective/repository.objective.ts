import { type Insertable, type Kysely, Transaction } from "kysely";
import { DB, Objectives } from "../../common/types/kysely/db.type";
import { UpdateObjectiveInput } from "./schemas/objective.schema";
import { sql } from "kysely";

type InsertableObjectiveRowType = Insertable<Objectives>;

export async function updateObjective(con: Kysely<DB> | Transaction<DB>, id: string, schema: UpdateObjectiveInput) {
    return await con.updateTable("objectives").returningAll().set({ ...schema, updatedAt: sql`now()` }).where("id", "=", id).executeTakeFirst();
}
export async function create(con: Kysely<DB> | Transaction<DB>, entity: InsertableObjectiveRowType) {
    return await con.insertInto("objectives").returningAll().values(entity).executeTakeFirstOrThrow();
}
