import express from "express";
import { productImage } from "../middleware/multer.js";
import {
  addProduct,
  deletedProduct,
  getAllProducts,
  getProductById,
  updatedProduct,
} from "../controllers/ProductController.js";

const router = express.Router();

router.post("/add", productImage.array("productImage", 4), addProduct);
router.post(
  "/product/:id",
  productImage.array("productImage", 4),
  updatedProduct
);
router.get("/product", getAllProducts);
router.get("/product/:id", getProductById);
router.delete("/product/:id", deletedProduct);

export default router