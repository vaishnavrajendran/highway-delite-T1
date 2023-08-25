import express from "express";
import { login, register } from "../controller/auth";

const router = express.Router();

/* POST */
router.post('/register', register)
router.post('/login', login)

export default router;