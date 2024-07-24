import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const PORT: number = Number(process.env.SERVER_PORT) | 4000;

const app: Application = express();

app.get('/', (req: Request, res: Response) => {
    res.send("Server is running...");
})

app.listen(PORT, () => {
    console.log(`Server started at ${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`);
})