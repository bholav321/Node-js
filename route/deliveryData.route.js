import express from 'express';
import { orderDeliver } from '../controller/deliveryData.controller.js';


const router = express.Router();
router.post("/orderDeliver",orderDeliver);

export default router