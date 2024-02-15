import { FastifyInstance } from "fastify";

export async function Default(app: FastifyInstance){
    app.get("/", (request, reply) => {
        return reply.status(200).send({ endpoints: {
            url: [
                    "/transaction/all",
                    "/transaction/create",
                    "/transaction/:id",
                    "/funds",
                ]
            } 
        });
    })
}