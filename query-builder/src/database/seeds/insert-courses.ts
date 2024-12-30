import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {

    await knex("courses").insert([
        {  name: "HTML" },
        {  name: "CSS" },
        {  name: "JAVASCRIPT" },
        {  name: "TYPESCRIPT" },
        {  name: "REACT" },
        {  name: "NODE" },
    ]);
};
