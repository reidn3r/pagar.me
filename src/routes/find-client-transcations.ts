import { FastifyInstance } from "fastify";
import { prisma } from '../db/prisma';
import { z } from  'zod';

export async function findTransactionByCard(app: FastifyInstance){
    //Busca todas as transações de um cliente

    app.get("/transaction/:card_number/:cvv", async(request, reply) => {
        const params = z.object({
            card_number: z.string().min(12).max(16),
            cvv: z.string().length(3)
        })

        const { card_number, cvv } = params.parse(request.params);

        const foundData = await prisma.transaction.findMany({
            where: {
                card_number: card_number,
                cvv: cvv
            }
        })

        return reply.status(200).send({
            data: foundData.map((data) => {
                return {
                    value_in_cents: data.value_in_cents,
                    method: data.payment_method,
                    description: data.description,
                    transaction_date: data.createdAt
                }
            })
        });
    })
    
}