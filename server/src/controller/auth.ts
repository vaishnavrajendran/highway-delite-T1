/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import Users from "../models/User";
import jwt from 'jsonwebtoken'

type UserObject = {
    fName: string;
    lastName: string;
    email: string;
};

export const register = async (req: Request, res: Response) => {
    try {
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(req.body.password, salt);

        const newUser = new Users({
            firstName: req.body.fName,
            lastName: req.body.lName,
            email: req.body.email,
            password: passwordHash,
        });
        await newUser.save().then((savedUser => {
            const userObj: UserObject = {
                fName: savedUser.firstName,
                lastName: savedUser.lastName,
                email: savedUser.email
            };
            return res.status(201).json(userObj);
        }));
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        
        const user = await Users.findOne({ email: email });
        if (!user) {
            throw new Error("User does not exist. ");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Invalid credentials. ");
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);
        const userObj: UserObject = {
            fName: user.firstName,
            lastName: user.lastName,
            email: user.email
        };
        res.status(200).json({ token, userObj });
    } catch (err:any) {
        res.status(400).json({ error: err.message });
    }
}