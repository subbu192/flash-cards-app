import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/userModel";

interface LoginReqBody {
    email: string,
    password: string
}

interface RegisterReqBody {
    name: string,
    email: string,
    password: string
}

export const loginUser = async (req: Request, res: Response) => {
    const { email, password }: LoginReqBody = req.body;

    User.findOne({ email: email })
        .then(async (user) => {
            const verified: boolean = await bcrypt.compare(password, user?.password!);
            if (verified) {
                const userDetails = { name: user?.name, email: user?.email, id: user?._id };
                const jwtToken: string = jwt.sign(userDetails, String(process.env.JWT_SECRET), { expiresIn: 60 * 10 });
                
                res.json({ status: 200, user: userDetails, jwt: jwtToken, message: 'Login Successfull.' });
            } else {
                res.json({ status: 404, message: 'Incorrect Password.' });
            }
        })
        .catch((err) => {
            console.log(err);
            res.json({ status: 404, message: 'User Not Found.' });
        });
}

export const registerUser = async (req: Request, res: Response) => {
    const { name, email, password }: RegisterReqBody = req.body;

    const hashedPassword: string = await bcrypt.hash(password, 10);

    const newUser = new User({
        name: name,
        email: email,
        password: hashedPassword
    });
    newUser.save()
        .then(() => {
            res.json({ status: 200, message: 'Registration Successfull.' });
        })
        .catch((err) => {
            console.log(err);
            res.json({ status: 404, message: 'Registration Failed.' });
        });
}