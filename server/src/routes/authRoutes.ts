import express from "express";
import { login, register, fetchOtp } from "../controller/auth";
import { verifyToken } from "../middlewares/auth";

const router = express.Router();

/* POST */
router.post('/register', register)
router.post('/login', login)
router.post('/fetch-otp', verifyToken, fetchOtp)

export default router;