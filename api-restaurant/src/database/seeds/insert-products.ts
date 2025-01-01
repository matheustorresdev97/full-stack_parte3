import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {

    await knex("products").del();

    await knex("products").insert([
        { name: "Refrigerante 350ml", price: 7.5 },
        { name: "Água Mineral 500ml", price: 5.0 },
        { name: "Suco Natural 300ml", price: 9.0 },
        { name: "Hambúrguer Clássico", price: 20.0 },
        { name: "Hambúrguer Vegano", price: 22.0 },
        { name: "Porção de Batata Frita", price: 15.0 },
        { name: "Pizza Margherita (8 pedaços)", price: 40.0 },
        { name: "Salada Caesar", price: 18.0 },
        { name: "Espaguete à Bolonhesa", price: 25.0 },
        { name: "Frango Grelhado com Legumes", price: 28.0 },
        { name: "Brownie com Sorvete", price: 12.0 }
    ]);
};
