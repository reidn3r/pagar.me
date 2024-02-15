import { FastifyInstance } from "fastify";
import { prisma } from '../db/prisma';
import { z } from 'zod';
import { addDays, format, formatISO } from 'date-fns';

export async function createTranscation(app: FastifyInstance){
    //Registra numa nova transação
    app.post("/transaction/create", async(request, reply) => {

        //validação
        const transactionBody = z.object({
            value_in_cents: z.number().positive().int(),
            description: z.string().max(64),
            payment_method: z.enum(["debit_card", "credit_card"]),
            card_number: z.string().max(16).min(12),
            expireAt: z.string(),
            name: z.string().max(64),
            cvv: z.string().length(3)     
        });
    
        try {
            const { value_in_cents, description, payment_method, card_number, expireAt, name, cvv } = transactionBody.parse(request.body);
            if(new Date(expireAt) <= new Date()) return reply.status(400).send({ message: "invalid card." });
            
            const paymentDate = payment_method === "credit_card" ? addDays(new Date(), 30) : new Date();
            const payableStatus = payment_method === "credit_card" ? "waiting_funds" : "paid";
            const processing_fee = payment_method === "credit_card" ? 3 : 5;
            
            //Criar camada de dto, serviços e repositórios
            const newData = await prisma.payable.create({
                data: {
                    payment_date: formatISO(paymentDate),
                    payment_status: payableStatus,
                    final_payable_in_cents: Math.floor(value_in_cents * (1 - processing_fee/100)),
                    transaction: {
                        create: {
                            value_in_cents,
                            fee_in_percentage: processing_fee,
                            description,
                            payment_method,
                            card_number,
                            name,
                            expireAt: formatISO(new Date(expireAt)),
                            cvv,
                        }
                    }
                }
            });
    
    
            reply.status(201).send({ message: `Payable: ${newData.id} created.` });
        } catch(err) {
            console.error("Error creating transaction:", err);
            reply.status(500).send({ message: "Failed to create transaction." });
        }
    });
}