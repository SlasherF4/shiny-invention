"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categories_service_1 = require("../services/categories.service");
const auth_service_1 = require("../services/auth.service");
const router = express_1.default.Router();
exports.default = router;
router.get("/", categories_service_1.getAllCategories);
router.post("/", auth_service_1.verifyUser, categories_service_1.addCategory);
