import {  placedOrder, viewAllOrderList } from "../controller/order.controller.js";
import express from 'express';
let route = express.Router();

route.post("/placeOrder",placedOrder);
// route.post("/findorderbyuserid",findorderbyuserid)
route.get("/viewallorder",viewAllOrderList);

export default route;