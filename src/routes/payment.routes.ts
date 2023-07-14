import { Router } from "express";
import mercadopago from "mercadopago";
import { createPreference, sendFeedback } from "../services/payment.service";
import * as dotenv from "dotenv";
import { verifyStock } from "../services/products.service";
dotenv.config();
// import { verifyStock } from "../services/products.service";

mercadopago.configure({
  access_token: process.env.TOKEN_MP as string,
});

const router = Router();

export default router;

router.post("/create", verifyStock, createPreference);

router.get("/feedback", sendFeedback);
