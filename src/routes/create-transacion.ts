import { FastifyInstance } from "fastify";
import { prisma } from '../db/prisma';
import { z } from 'zod';

export async function createTranscation(app: FastifyInstance){
    //Busca todas as transações
    app.get("/transaction/all", (request, reply) => {
        return true;
    })

    //Registra numa nova transação
    app.post("/transaction/create", (request, reply) => {
        return true
    })

    //Busca todas as transações de um cliente
    app.get("/transaction/:id", (request, reply) => {
        return true;
    })
}