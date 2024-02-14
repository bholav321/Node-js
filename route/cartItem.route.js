import express from 'express';
import { addToCart,viewAllCarts,viewAllCartProducts } from '../controller/cartItem.controller.js';
const router = express.Router();


router.get("/viewAllCarts",viewAllCarts)
router.post("/addToCart",addToCart);
router.get("/viewAllCartProducts",viewAllCartProducts)
console.log("router")
export default router;
    