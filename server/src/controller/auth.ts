/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import Users from "../models/User";
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer';
import SMTPTransport from "nodemailer/lib/smtp-transport";
import Otp from "../models/Otp";
import mongoose from "mongoose";

type UserObject = {
    _id: mongoose.Types.ObjectId,
    fName: string,
    lastName: string,
    email: string,
    token: string
};

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
            _id: user._id,
            fName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            token
        };
        res.status(200).json({ userObj });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
}


export const register = async (req: Request, res: Response) => {
    try {
        const user = await Users.findOne({ email: req.body.email });
        if (user) throw new Error('User already exists.Try login')
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(req.body.password, salt);

        const newUser = new Users({
            firstName: req.body.fName,
            lastName: req.body.lName,
            email: req.body.email,
            password: passwordHash,
        });
        await newUser.save().then((savedUser => {
            const userToken = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET as string);
            sentOtp(req.body.email).then(async (otp) => {
                if (typeof otp !== 'undefined') {
                    const otpHash = await bcrypt.hash(otp?.toString(), salt)
                    console.log("otp savedUser", otp);
                    const userOtp = new Otp({
                        userId: savedUser._id,
                        email: req.body.email,
                        otp: otpHash
                    })
                    await userOtp.save();
                    const userObj: UserObject = {
                        _id: savedUser._id,
                        fName: savedUser.firstName,
                        lastName: savedUser.lastName,
                        email: savedUser.email,
                        token: userToken
                    };
                    return res.status(201).json(userObj);
                }
            })
        }));
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
}

const sentOtp = async (email: string) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_PASS,
            },
        });
        const otp = Math.floor(Math.random() * 9000) + 1000;
        const info: SMTPTransport.SentMessageInfo = await transporter.sendMail({
            from: process.env.SMTP_MAIL,
            to: email,
            subject: "Otp verification",
            html: `<p>Hi there,</p>
               <p>Use this otp ${otp} to verify your email</p>`,
        });

        console.log("Email sent:", info.response);
        if (info)
            return Promise.resolve(otp);
    } catch (error) {
        console.log("Error occured while sending mail", error);
    }
}


export const fetchOtp = async (req: Request, res: Response) => {
    const { otp } = req.body;
    if (!req.user) {
        return res.status(400).json({ message: 'Unauthorized' })
    }
    const userOtp = await Otp.findOne({ userId: new mongoose.Types.ObjectId(req.user.id) }).sort({ createdAt: -1 }).exec();
    if (userOtp) {
        const isMatch = await bcrypt.compare(otp, userOtp.otp)
        return isMatch ? res.status(200).json({ message: 'Otp Verified' }) : res.status(200).json({ message: 'Wrong Otp' })
    } else {
        return res.status(400).json({ message: 'Otp expired' })
    }
}