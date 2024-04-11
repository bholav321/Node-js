import express from 'express';
import { addCategory,addCategoryInBulk,removeCategory,viewAllCategory } from '../controller/category.controller.js';
// import { viewAllByCategory } from '../controller/product.controller.js';
 
const router = express.Router();

router.post("/addCategory",addCategory)
router.post("/addCategoryInBulk",addCategoryInBulk);
router.get("/viewAllCategory",viewAllCategory)
router.delete("/removecategory",removeCategory)

export default router;