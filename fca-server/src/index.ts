import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";

import { connectDb } from "./libs/db";
import authRouter from './routes/authRoutes';

dotenv.config();

const PORT: number = Number(process.env.SERVER_PORT) | 4000;

const app: Application = express();

app.use(express.json());

app.use('/auth', authRouter);

app.get('/', (req: Request, res: Response) => {
    res.send("Server is running...");
})

connectDb()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`[fca-server]: Server is running at ${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`);
        });
    })
    .catch((err) => {
        console.log("[fca-server]: Server failed to start due to an error in Database connection.");
    });