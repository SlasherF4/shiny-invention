import express from "express";
import {
  addProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  getProductsByCategory,
  modifyProduct,
} from "../services/products.service";
import { verifyUser } from "../services/auth.service";
import { upload } from "../middlewares/multer";

const router = express.Router();

router.get("/", getAllProducts);

router.get("/:id", getProductById);

router.get("/category/:category", getProductsByCategory);

router.post("/", upload.single("image"), verifyUser, addProduct);

router.delete("/:id", verifyUser, deleteProductById);

router.put("/", verifyUser, modifyProduct);

export default router;
