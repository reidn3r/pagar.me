import { FastifyInstance } from "fastify";
import { prisma } from '../db/prisma';

export async function findAllTransactions(app: FastifyInstance){
    //Busca todas as transações
    app.get("/transaction/all", async(request, reply) => {
        try{
            const transactions = await prisma.payable.findMany({
                select: {
                    payment_status: true,
                    final_payable_in_cents: true,
                    transaction : {
                        select: {
                            // id: true,
                            value_in_cents: true,
                            payment_method: true,
                            card_number: true,
                            cvv: true,
                            description: true
                        }
                    }
                }

            })
            return reply.status(200).send({ data : transactions.map((payable, idx) => {
                return { 
                    payable_status: payable.payment_status,
                    payable_in_cents: payable.final_payable_in_cents,
                    transaction: payable.transaction.map((T) => {
                        return { 
                            // id: T.id,
                            value_in_cents: T.value_in_cents,
                            payment_method: T.payment_method,
                            description: T.description,
                            card_number_last_digits: T.card_number.slice(-4),
                            cvv: T.cvv,
                        }
                    })
                }
            }) 
        })
    }
    catch(err){
        return reply.status(500).send({ message: "Internal server error" });
    }
})        
}