import { placedOrder } from "../controller/order.controller.js";
import express from 'express';
let route = express.Router();

route.post("/placeOrder",placedOrder);
export default route;