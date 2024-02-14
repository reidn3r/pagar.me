import 'dotenv/config';
require('dotenv').config();
import fastify from "fastify";

const app = fastify();

app.get("/", (request, reply) => {
    return reply.status(200).send({ message: "ok" });
})


const port = Number(process.env.PORT) || 3000;
app.listen({ port: port }, () => {
    console.log(`Running at: http://localhost:${port}`);
})