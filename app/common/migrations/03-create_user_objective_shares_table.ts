import { type Kysely, sql } from "kysely";

export async function up(db: Kysely<any>) {
    await db.schema
        .createTable("user_objective_shares")
        .addColumn("id", "uuid", (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
        .addColumn("userid", "uuid", (col) => col.notNull().references("users.id").onDelete("cascade"))
        .addColumn("objectiveid", "uuid", (col) => col.notNull().references("objectives.id").onDelete("cascade"))
        .execute();
}

export async function down(db: Kysely<any>) {
    await db.schema.dropTable("user_objective_shares").execute();
}
