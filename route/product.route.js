import express from 'express';
import { addProduct, viewAllProducts,viewAllByCategory,removeProduct,addProductInBulk } from '../controller/product.controller.js';
 
const router = express.Router();
router.post("/addProduct",addProduct)
router.post("/addProductInBulk",addProductInBulk)
router.get("/viewAll",viewAllByCategory)
router.get("/viewAllProducts",viewAllProducts)
router.post("/removeProduct",removeProduct)

export default router;