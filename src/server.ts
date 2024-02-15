import 'dotenv/config';
require('dotenv').config();
import fastify from "fastify";
import { createTranscation } from './routes/create-transacion';
import { findAllTransactions } from './routes/find-all-transactions';
import { findTransactionByCard } from './routes/find-client-transcations';
import { checkFunds } from './routes/check-funds';
import { Default } from './routes/default';

const app = fastify();

//routes
app.register(findAllTransactions);
app.register(findTransactionByCard);
app.register(createTranscation);
app.register(checkFunds);
app.register(Default);


const port = Number(process.env.PORT) || 3000;
app.listen({ port: port }, () => {
    console.log(`Running at: http://localhost:${port}`);
})