import { addToCart } from "../controller/cart.controller.js";
import express from "express";

let route = express.Router();

route.post("/addUserIntoCart",addToCart);

export default route;