import express from 'express'
import { savepayment } from '../controller/payment.controller.js';

const route = express.Router();

route.post("/savepayment",savepayment)

export default route