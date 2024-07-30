import express from 'express';
import { deliveryBoyOrder, orderDeliver,orderDetail } from '../controller/deliveryData.controller.js';


const router = express.Router();
router.post("/getOrder",orderDeliver);
router.get("/orderDetails",orderDetail)
router.post("/deliveryBoyOrder",deliveryBoyOrder)
export default router