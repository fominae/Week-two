import { type Insertable, type Kysely, sql, Transaction, Updateable } from "kysely";
import { DB, Objectives } from "../../common/types/kysely/db.type";
import { GetObjectivesQuery } from "./schemas/get-all-objectives.schema";

type InsertableObjectiveRowType = Insertable<Objectives>;

export async function updateObjective(con: Kysely<DB> | Transaction<DB>, id: string, entity: Updateable<Objectives>) {
    return await con
        .updateTable("objectives")
        .returningAll()
        .set({
            ...entity,
            updatedAt: sql`now()`
        })
        .where("id", "=", id)
        .executeTakeFirst();
}

export async function create(con: Kysely<DB> | Transaction<DB>, entity: InsertableObjectiveRowType) {
    return await con.insertInto("objectives").returningAll().values(entity).executeTakeFirstOrThrow();
}

export async function getObjectiveById(con: Kysely<DB> | Transaction<DB>, id: string) {
    return await con.selectFrom("objectives").selectAll().where("id", "=", id).executeTakeFirstOrThrow();
}

export async function getObjectives(con: Kysely<DB> | Transaction<DB>, creatorid: string, filters: GetObjectivesQuery) {
    let query = con.selectFrom("objectives").selectAll().where("creatorid", "=", creatorid);

    if (filters.search) {
        query = query.where("title", "ilike", `%${filters.search}%`);
    }

    if (filters.isCompleted) {
        query = query.where("isCompleted", "=", filters.isCompleted === "true");
    }

    if (filters.sortBy && filters.sortDirection) {
        query = query.orderBy(filters.sortBy, filters.sortDirection);
    }

    query = query.limit(filters.limit);

    query = query.offset(filters.offset);

    return await query.execute();
}
export async function deleteObjective(con: Kysely<DB> | Transaction<DB>, id: string) {
    return await con.deleteFrom("objectives").where("id", "=", id).execute();
}