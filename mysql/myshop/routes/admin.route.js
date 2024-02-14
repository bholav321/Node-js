// import Admin from "../module/admin.module.js";
import express from "express";
import { signIn, signUp, product,update,show, deleteData } from "../controller/admin.controller.js";
const route = express.Router();

route.post("/signUp",signUp);
route.post("/signIn",signIn);
route.post("/update",update)
route.post("/show",show)
route.delete("/delete",deleteData)
route.post("/product",product);

export default route;