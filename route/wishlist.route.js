import { addProductIntoWishlist,removeItemFromList, removeItemFromWishList, viewAllFavouriteProducts } from "../controller/wishlist.controller.js";
import express from 'express'

const  router = express.Router();

router.post("/addWishlist",addProductIntoWishlist);
router.delete("/removeItemFromWishlist",removeItemFromList)
router.post("/viewAllfavoriteproduct",viewAllFavouriteProducts)
router.delete("/removeItemFromWishList/:userId/:productId",removeItemFromWishList)


export default router;