import { Router } from "express";
import mercadopago from "mercadopago";
import { createPreference, sendFeedback } from "../services/payment.service";

mercadopago.configure({
  access_token: "TEST-2515620579334346-052314-13839e7fb3ae7e5875c1877ab0d46c39-216892891"
})

const router = Router()

export default router

router.post("/create", createPreference)

router.get("/feedback", sendFeedback)

