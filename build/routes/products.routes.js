"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_service_1 = require("../services/products.service");
const auth_service_1 = require("../services/auth.service");
const multer_1 = require("../middlewares/multer");
const router = express_1.default.Router();
router.get("/", products_service_1.getAllProducts);
router.get("/:id", products_service_1.getProductById);
router.get("/category/:category", products_service_1.getProductsByCategory);
router.post("/", multer_1.upload.single("image"), auth_service_1.verifyUser, products_service_1.addProduct);
router.delete("/:id", auth_service_1.verifyUser, products_service_1.deleteProductById);
router.put("/", auth_service_1.verifyUser, products_service_1.modifyProduct);
exports.default = router;
