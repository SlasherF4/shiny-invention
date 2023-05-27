import express from "express";
import { loginUser } from "../services/auth.service";

const router = express.Router()

export default router

router.post("/login", loginUser)