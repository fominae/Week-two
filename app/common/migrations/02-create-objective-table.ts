import { type Kysely, sql } from "kysely";

export async function up(db: Kysely<any>) {
    await db.schema
        .createTable("objectives")
        .addColumn("id", "uuid", (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
        .addColumn("title", "varchar(127)", (col) => col.notNull())
        .addColumn("description", "text")
        .addColumn("creatorid", "uuid", (col) => col.notNull().references("users.id").onDelete("cascade"))
        .addColumn("notifyAt", "timestamp")
        .addColumn("createdAt", "timestamp", (col) => col.defaultTo(sql`current_timestamp`))
        .addColumn("updatedAt", "timestamp", (col) => col.defaultTo(sql`current_timestamp`))
        .addColumn("isCompleted", "boolean", (col) => col.defaultTo(false))
        .execute();
}

export async function down(db: Kysely<any>) {
    await db.schema.dropTable("objectives").execute();
}
