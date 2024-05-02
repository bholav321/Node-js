import express from 'express';
import multer from 'multer';
import { addExcelSheet, viewAllProducts,viewAllByCategory,viewProductsByCategory,removeProduct,addProductInBulk, updateRating, addoneproduct, displayAllProducts } from '../controller/product.controller.js';
 
const upload = multer( { dest: './public/images/' } );
const router = express.Router();

router.post("/uploadExcelSheet",addExcelSheet)
router.post("/addSingleProduct",addoneproduct)
router.post("/addProductInBulk",addProductInBulk)
router.get("/viewAll",viewAllByCategory)
router.get("/viewAllProducts",viewAllProducts)
router.delete("/removeProduct",removeProduct)
router.post("/viewProductByCategory/:categoryName",viewProductsByCategory)
router.post("/updateRating",updateRating)
router.get("/displayAllProducts",displayAllProducts)
export default router;