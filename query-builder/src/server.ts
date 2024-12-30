import express, { Request, Response } from "express";
import { knex } from "./database/knext";


const PORT = 3333;

const app = express();
app.use(express.json());

app.post("/courses", async (request: Request, response: Response) => {
    const { name } = request.body

    await knex("courses").insert({ name })
    //await knex.raw("INSERT INTO courses (name) VALUES (?)", name)

    response.status(201).json({ name })
})

app.get("/courses", async (request: Request, response: Response) => {
    //const courses = await knex.raw("SELECT * FROM courses")

    const courses = await knex("courses").select().orderBy("name")

    response.json(courses)
})

app.put("/courses/:id", async (request: Request, response: Response) => {

    const { name } = request.body;
    const { id } = request.params;

    await knex("courses").where("id", id).update({ name });

    response.json({ id, name });

});

app.delete("/courses/:id", async (request: Request, response: Response) => {
    const { id } = request.params;

    await knex("courses").where("id", id).delete();

    response.json({ id });
});

app.post("/modules", async (request: Request, response: Response) => {
    const { course_id, name } = request.body

    await knex("course_modules").insert({ course_id, name })

    response.status(201).json({ course_id, name })
})

app.get("/modules", async (request: Request, response: Response) => {

    const modules = await knex("course_modules").select();

    response.json(modules)
})

app.get("/courses/:id/modules", async (request: Request, response: Response) => {
    const courses = await knex("courses")
        .select("courses.id AS course_id","courses_modules.id AS module_id", "course_modules.name AS module", "courses.name AS course")
        .join("courses_modules", "courses.id", "courses_modules.course_id")
    response.json(courses)
})

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));