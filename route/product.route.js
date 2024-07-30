import express from 'express';
import multer from 'multer';
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url';
import { addExcelSheet, viewAllProducts,viewAllByCategory,viewProductsByCategory,removeProduct,addProductInBulk, updateRating, addoneproduct, displayAllProducts, brandlist, getproductbybrand, getproductbyprice } from '../controller/product.controller.js';
 
const upload = multer( { dest: './public/images/' } );

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const imageDir = path.join(__dirname, '..', 'images');
        if (!fs.existsSync(imageDir)) {
            fs.mkdirSync(imageDir);
        }
        cb(null, imageDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append the correct file extension
    }
});

const uploadsingle = multer({ storage: storage });

router.post('/addSingleProduct', uploadsingle.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 }
]), addoneproduct);








router.post("/uploadExcelSheet",upload.single('excelFile'),addExcelSheet)
// router.post("/addSingleProduct",addoneproduct)
router.post("/addProductInBulk",addProductInBulk)
router.get("/viewAll",viewAllByCategory)
router.get("/viewAllProducts",viewAllProducts)
router.delete("/removeProduct",removeProduct)
router.post("/viewProductByCategory/:categoryName",viewProductsByCategory)
router.post("/updateRating",updateRating)
router.get("/displayAllProducts",displayAllProducts)
router.post("/getproductbybrand", getproductbybrand)
router.post("/getproductbyprice",getproductbyprice)
router.get("/brand",brandlist)
export default router;