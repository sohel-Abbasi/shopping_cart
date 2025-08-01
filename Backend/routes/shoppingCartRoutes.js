import express from "express";
import { ensureAuthenticated } from "../middleware/AuthMiddleware.js";
import { getCart, addToCart } from "../controller/cartController.js";
const router = express.Router();

router.route("/products").get(ensureAuthenticated, (req, res) => {
  res
    .status(200)
    .json({ message: "Products fetched successfully", success: true });
});

router
  .route("/products-cart")
  .get(ensureAuthenticated, getCart)
  .post(ensureAuthenticated, addToCart);

export default router;
