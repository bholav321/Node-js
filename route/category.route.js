import express from 'express';
import { addCategory,addCategoryInBulk } from '../controller/category.controller.js';
 
const router = express.Router();
router.post("/addCategory",addCategory)
router.post("/addCategoryInBulk",addCategoryInBulk)
export default router;