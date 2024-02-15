import { FastifyInstance } from "fastify";
import { prisma } from '../db/prisma';

export async function checkFunds(app: FastifyInstance){
    app.get("/funds", async(request, reply) => {
        let available:number = 0;
        let waiting_funds:number = 0;

        const data = await prisma.payable.findMany();
        data.map((p) => {
            if(p.payment_status === "paid"){
                available += p.final_payable_in_cents;
            }
            else if(p.payment_status === "waiting_funds"){
                waiting_funds += p.final_payable_in_cents;
            }
        })

        return reply.status(200).send({ funds: { available, waiting_funds } });
    })
}