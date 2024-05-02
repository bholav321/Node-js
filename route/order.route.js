import {  buyNow, placedOrder, viewAllOrderList,viewParticularUserOrder } from "../controller/order.controller.js";
import express from 'express';
let route = express.Router();

route.post("/placeOrder",placedOrder);
route.post("/viewParticularUserOrder",viewParticularUserOrder)
route.get("/viewAllOrders",viewAllOrderList);
route.post("/buyNow",buyNow);


export default route;