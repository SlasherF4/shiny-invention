"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mercadopago_1 = __importDefault(require("mercadopago"));
const payment_service_1 = require("../services/payment.service");
// import { verifyStock } from "../services/products.service";
mercadopago_1.default.configure({
    access_token: process.env.TOKEN_MP,
});
const router = (0, express_1.Router)();
exports.default = router;
router.post("/create", payment_service_1.createPreference);
router.get("/feedback", payment_service_1.sendFeedback);
