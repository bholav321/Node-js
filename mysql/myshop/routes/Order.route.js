import { orderDetails, orderPlaced } from "../controller/order.controller.js";
import express from "express"
let route = express.Router();

route.post("/orderPlaced",orderPlaced);
route.get("/orderDetails",orderDetails)

export default route;