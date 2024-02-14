

import express from "express";
import { addProduct,productList,deleteProdcut,category, showById} from "../controller/product.controller.js";
import multer from "multer";
import {verify} from "../varification/verify.js";
const update = multer({dest:"public/images/"})
const route = express.Router();

route.post("/addProduct",update.single("thumbnail"),addProduct);
route.get("/productList",verify,productList)
route.delete("/delete",deleteProdcut)
route.get("/category",category)
route.get("/categoryById",showById)

export default route;