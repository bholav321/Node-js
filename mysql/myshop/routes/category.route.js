import express from 'express';
import { category ,deleteCategory,show,addCategory} from '../controller/category.controller.js';

let route =  express();
route.post("/save",category);
route.delete("/delete",deleteCategory)
route.post("/show",show);
route.post("/add",addCategory)
export default route;