import express from "express";
import { getAllCategories, addCategory } from "../services/categories.service";
import { verifyUser } from "../services/auth.service";

const router = express.Router();

export default router;

router.get("/", getAllCategories);

router.post("/", verifyUser, addCategory);
