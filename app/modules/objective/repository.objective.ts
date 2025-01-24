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

export async function getObjectiveById(con: Kysely<DB> | Transaction<DB>, id: string) {
    return await con.selectFrom("objectives").selectAll().where("id", "=", id).executeTakeFirstOrThrow();
}

export async function getObjectives(
    con: Kysely<DB>,
    filters: {
        search?: string;
        isCompleted?: boolean;
        sortByTitle?: "asc" | "desc";
        sortByCreatedAt?: "asc" | "desc";
        sortByNotifyAt?: "asc" | "desc";
        limit?: number;
        offset?: number;
        creatorid: string;
    }
) {
    let query = con.selectFrom("objectives").selectAll().where("creatorid", "=", filters.creatorid);

    if (filters.search) {
        query = query.where("title", "like", `%${filters.search}%`);
    }

    if (filters.isCompleted !== undefined) {
        query = query.where("isCompleted", "=", filters.isCompleted);
    }

    // Добавляем сортировку по отдельным полям
    if (filters.sortByTitle) {
        query = query.orderBy("title", filters.sortByTitle);
    }
    if (filters.sortByCreatedAt) {
        query = query.orderBy("createdAt", filters.sortByCreatedAt);
    }
    if (filters.sortByNotifyAt) {
        query = query.orderBy("notifyAt", filters.sortByNotifyAt);
    }

    if (filters.limit) {
        query = query.limit(filters.limit);
    }

    if (filters.offset) {
        query = query.offset(filters.offset);
    }

    return await query.execute();
}
