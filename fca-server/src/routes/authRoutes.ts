import express, { IRouter } from "express";
import { loginUser, registerUser } from "../controllers/userController";

const router: IRouter = express.Router();

router.post('/login', loginUser);

router.post('/register', registerUser);

export default router;