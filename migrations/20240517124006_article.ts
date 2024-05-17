import type { Knex } from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable("articles", (table: Knex.TableBuilder) => {
    table.increments("id");
    table.string("title").notNullable();
    table.text("body").notNullable();
    table.boolean("isApproved").notNullable().defaultTo(false);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable("articles");
}
