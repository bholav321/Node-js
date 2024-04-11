import express from 'express';
import multer from 'multer';
import { addProduct, viewAllProducts,viewAllByCategory,viewProductsByCategory,removeProduct,addProductInBulk } from '../controller/product.controller.js';
 
const upload = multer( { dest: './public/images/' } );
const router = express.Router();

router.post("/addProduct",upload.single('thumbnail'),addProduct)
router.post("/addProductInBulk",addProductInBulk)
router.get("/viewAll",viewAllByCategory)
router.get("/viewAllProducts",viewAllProducts)
router.delete("/removeProduct",removeProduct)
router.post("/viewProductByCategory/:categoryName",viewProductsByCategory)

export default router;