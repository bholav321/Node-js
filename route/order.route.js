import {  buyNow, getParticularOrder, placedOrder, updateStatus, viewAllOrderList,viewParticularUserOrder } from "../controller/order.controller.js";
import express from 'express';
let route = express.Router();

route.post("/placeOrder",placedOrder);
route.post("/viewParticularUserOrder",viewParticularUserOrder)
route.get("/viewAllOrders",viewAllOrderList);
route.post("/buyNow",buyNow);
route.put("/updateOrderStatus",updateStatus)
route.post("/getParticularOrder",getParticularOrder)
export default route;