import express from 'express';

import { signUp, signIn, updatePassword, list } from '../controller/deliveryBoy.controller.js';
import { body } from 'express-validator';

const router = express.Router();

router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.post("/updatePassword", updatePassword)
router.get("/list",list)


export default router;


