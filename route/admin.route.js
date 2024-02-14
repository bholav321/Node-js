import express from 'express';
// import { verifyToken } from '../Varification/auth.js'
import {signUp,signIn,updatePassword} from '../controller/admin.controller.js';
import { body } from 'express-validator';
const router = express.Router();
router.post("/signUp",body("email","Please enter a email").notEmpty(),body("email","Enter a valid email").isEmail(),
    body("name","Please enter a name").notEmpty(), body("name","Please enter a valid name").isAlpha(),
    body("password","Password length must be more than 5").isStrongPassword(),signUp);
router.post("/signIn",signIn);
router.post("/updatePassword",updatePassword)

// router.post("")
export default router;


