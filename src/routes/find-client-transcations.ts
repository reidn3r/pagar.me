import { FastifyInstance } from "fastify";

export async function findTransactionByCard(app: FastifyInstance){
    //Busca todas as transações de um cliente
    app.get("/transaction/:id", (request, reply) => {
        return true;
    })
    
}