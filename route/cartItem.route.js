import express from 'express';
import { addToCart,viewAllCarts,viewAllCartProducts,removeAllItems,fetchCartItems,removeItemFromCart, removeProductFromCart,viewProductByCartID, getCartId } from '../controller/cartItem.controller.js';
const router = express.Router();


router.get("/viewAllCarts",viewAllCarts)
router.post("/addToCart",addToCart);
router.get("/viewAllCartProducts",viewAllCartProducts)
router.delete("/removeProduct",removeProductFromCart)
router.post("/getCartId",getCartId)
router.get("/list/:userId",fetchCartItems);
router.get("/viewProductByCartID/:cartId",viewProductByCartID)
router.delete("/removeItem/:userid/:productId", removeItemFromCart); 
router.delete("/removeAllItems/:userId",removeAllItems)
export default router;
    